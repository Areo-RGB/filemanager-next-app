"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { IconRefresh, IconArrowsShuffle, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { seriesList } from '@/lib/data/drills';

interface Card {
    id: number;
    src: string;
    videoSrc?: string;
    alt: string;
    title: string;
    description: string;
}

export default function CardStack() {
    const [seriesIndex, setSeriesIndex] = useState(0);
    const activeSeries = seriesList[seriesIndex];
    const initialCards: Card[] = activeSeries.cards;

    const [cards, setCards] = useState<Card[]>(initialCards);
    const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

    const [prevSeriesIndex, setPrevSeriesIndex] = useState(seriesIndex);

    // Reset stack whenever the series changes
    if (seriesIndex !== prevSeriesIndex) {
        setPrevSeriesIndex(seriesIndex);
        setCards(initialCards);
        setCurrentIndex(0);
        setDragDirection(null);
        setActiveVideoIndex(null);
    }

    useEffect(() => {
        if (activeVideoIndex !== null) {
            document.body.classList.add('hide-dock');
        } else {
            document.body.classList.remove('hide-dock');
        }
        return () => document.body.classList.remove('hide-dock');
    }, [activeVideoIndex]);

    const dragY = useMotionValue(0);
    const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

    // Configuration
    const offset = 10;
    const scaleStep = 0.06;
    const dimStep = 0.15;
    const stiff = 170;
    const damp = 26;
    const borderRadius = 12;
    const swipeThreshold = 50;

    const spring = {
        type: 'spring' as const,
        stiffness: stiff,
        damping: damp
    };

    const moveToEnd = () => {
        setCards(prev => [...prev.slice(1), prev[0]]);
        setCurrentIndex((prev) => (prev + 1) % initialCards.length);
    };

    const moveToStart = () => {
        setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
        setCurrentIndex((prev) => (prev - 1 + initialCards.length) % initialCards.length);
    };

    const shuffleCards = () => {
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
    };

    const nextSeries = () => {
        setSeriesIndex((prev) => (prev + 1) % seriesList.length);
    };

    const prevSeries = () => {
        setSeriesIndex((prev) => (prev - 1 + seriesList.length) % seriesList.length);
    };

    const resetCards = () => {
        setCards(initialCards);
        setCurrentIndex(0);
    };

    const handleDragEnd = (_: unknown, info: { offset: { y: number }, velocity: { y: number } }) => {
        const velocity = info.velocity.y;
        const offset = info.offset.y;

        if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
            if (offset < 0 || velocity < 0) {
                setDragDirection('up');
                setTimeout(() => {
                    moveToEnd();
                    setDragDirection(null);
                }, 150);
            } else {
                setDragDirection('down');
                setTimeout(() => {
                    moveToStart();
                    setDragDirection(null);
                }, 150);
            }
        }
        dragY.set(0);
    };

    return (
        <div className={`w-full h-screen flex items-center justify-center bg-background text-foreground transition-all duration-500 relative overflow-hidden`}>
            {/* Animated Grid Background */}
            <svg
                className="absolute inset-0 w-full h-full opacity-10 transition-opacity duration-300"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <motion.path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            className="text-foreground/20"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Top Control Bar */}
            <div className="absolute top-8 left-8 right-8 flex items-center justify-start z-30">
                <div className="flex gap-2">
                    <motion.button
                        onClick={resetCards}
                        className={`p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border backdrop-blur-sm transition-colors duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Reset"
                    >
                        <IconRefresh className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                        onClick={shuffleCards}
                        className={`p-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border backdrop-blur-sm transition-colors duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Shuffle"
                    >
                        <IconArrowsShuffle className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Navigation Buttons (Series Switchers) */}
            <motion.button
                onClick={prevSeries}
                className={`absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border backdrop-blur-sm transition-colors duration-200 z-20 hidden md:block`}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                title="Previous Series"
            >
                <IconChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
                onClick={nextSeries}
                className={`absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border backdrop-blur-sm transition-colors duration-200 z-20 hidden md:block`}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                title="Next Series"
            >
                <IconChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Card Stack Container */}
            <div className="relative portrait:w-64 portrait:h-96 landscape:w-96 landscape:h-64 sm:portrait:w-80 sm:portrait:h-[28rem] sm:landscape:w-[28rem] sm:landscape:h-80 md:w-[32rem] md:h-80 overflow-visible z-10 transition-all duration-300">
                <ul className="relative w-full h-full m-0 p-0">
                    <AnimatePresence>
                        {cards.map((card, i) => {
                            const { id, src, alt, title, description, videoSrc } = card;
                            const isFront = i === 0;
                            const brightness = Math.max(0.3, 1 - i * dimStep);
                            const baseZ = cards.length - i;

                            return (
                                <motion.li
                                    key={id}
                                    className={`absolute w-full h-full list-none overflow-hidden border-2 border-border bg-black group`}
                                    style={{
                                        borderRadius: `${borderRadius}px`,
                                        cursor: isFront ? 'grab' : 'auto',
                                        touchAction: 'none',
                                        boxShadow: isFront
                                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                            : '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
                                        rotateX: isFront ? rotateX : 0,
                                        transformPerspective: 1000
                                    }}
                                    animate={{
                                        top: `${i * -offset}%`,
                                        scale: 1 - i * scaleStep,
                                        filter: `brightness(${brightness})`,
                                        zIndex: baseZ,
                                        opacity: dragDirection && isFront ? 0 : 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        transition: { duration: 0.2 }
                                    }}
                                    transition={spring}
                                    drag={isFront ? 'y' : false}
                                    dragConstraints={{ top: 0, bottom: 0 }}
                                    dragElastic={0.7}
                                    onDrag={(_, info) => {
                                        if (isFront) {
                                            dragY.set(info.offset.y);
                                        }
                                    }}
                                    onDragEnd={handleDragEnd}
                                    onDoubleClick={() => {
                                        if (videoSrc) {
                                            const originalIndex = initialCards.findIndex(d => d.id === card.id);
                                            if (originalIndex !== -1) {
                                                setActiveVideoIndex(originalIndex);
                                            }
                                        }
                                    }}
                                    whileDrag={
                                        isFront
                                            ? {
                                                zIndex: cards.length + 1,
                                                cursor: 'grabbing',
                                                scale: 1.05,
                                            }
                                            : {}
                                    }
                                >
                                    {videoSrc && isFront ? (
                                        <video
                                            src={videoSrc}
                                            className="w-full h-full object-cover pointer-events-none select-none"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={src}
                                            alt={alt}
                                            className="w-full h-full object-cover pointer-events-none select-none"
                                            draggable={false}
                                        />
                                    )}

                                    {/* Card Info Overlay */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 z-10 ${isFront
                                            ? 'opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                                            : 'opacity-0 translate-y-4 pointer-events-none'
                                            }`}
                                    >
                                        <h3 className="text-white font-bold text-lg">{title}</h3>
                                        <p className="text-white/80 text-sm line-clamp-2">{description}</p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
            </div>

            {/* Progress Indicator */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 flex gap-2 z-20" title={`Card ${currentIndex + 1} of ${initialCards.length}`}>
                {initialCards.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex % initialCards.length
                            ? `bg-primary w-8`
                            : `bg-muted w-1.5`
                            }`}
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </div>

            {/* Fullscreen Video Overlay */}
            <AnimatePresence>
                {activeVideoIndex !== null && initialCards[activeVideoIndex]?.videoSrc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                    >
                        <button
                            onClick={() => setActiveVideoIndex(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors z-[110]"
                        >
                            <IconX className="w-8 h-8" />
                        </button>

                        {/* Left Arrow */}
                        {activeVideoIndex > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideoIndex(activeVideoIndex - 1);
                                }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors z-[110]"
                            >
                                <IconChevronLeft className="w-8 h-8" />
                            </button>
                        )}

                        {/* Right Arrow */}
                        {activeVideoIndex < initialCards.length - 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideoIndex(activeVideoIndex + 1);
                                }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors z-[110]"
                            >
                                <IconChevronRight className="w-8 h-8" />
                            </button>
                        )}

                        <motion.div
                            key={activeVideoIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full h-full outline-none"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50 && activeVideoIndex < initialCards.length - 1) {
                                    setActiveVideoIndex(activeVideoIndex + 1);
                                } else if (swipe > 50 && activeVideoIndex > 0) {
                                    setActiveVideoIndex(activeVideoIndex - 1);
                                }
                            }}
                        >
                            <video
                                src={initialCards[activeVideoIndex].videoSrc}
                                controls
                                autoPlay
                                className="w-full h-full object-cover outline-none"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
