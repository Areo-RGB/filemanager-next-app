export interface DrillCard {
    id: number;
    src: string;
    videoSrc?: string;
    alt: string;
    title: string;
    description: string;
}

export interface DrillSeries {
    id: string;
    title: string;
    description: string;
    cards: DrillCard[];
}

export const closeControlDrills: DrillCard[] = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/001_Single_Leg_Weave_right_foot.mp4',
        alt: 'Single Leg Weave Right Foot',
        title: 'Single Leg Weave Right Foot',
        description: 'Practice weaving through tight spaces using your right foot.'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/002_Single_Leg_Weave_left_foot.mp4',
        alt: 'Single Leg Weave Left Foot',
        title: 'Single Leg Weave Left Foot',
        description: 'Practice weaving through tight spaces using your left foot.'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/003_Outside_Foot_Only.mp4',
        alt: 'Outside Foot Only',
        title: 'Outside Foot Only',
        description: 'Focus on maximum control using the outside of the foot to manipulate the ball.'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/004_Two_touch_outside_inside_right_foot.mp4',
        alt: 'Two Touch Outside Inside Right Foot',
        title: '2-Touch Outside-Inside (Right)',
        description: 'A two-touch sequence alternating outside and inside cuts with the right foot.'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/005_Two_touch_outside_inside_left_foot.mp4',
        alt: 'Two Touch Outside Inside Left Foot',
        title: '2-Touch Outside-Inside (Left)',
        description: 'A two-touch sequence alternating outside and inside cuts with the left foot.'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/006_La_Croqueta.mp4',
        alt: 'La Croqueta',
        title: 'La Croqueta',
        description: 'The classic Iniesta move: quickly shift the ball from one foot to the other to evade defenders.'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/007_Inside_Inside.mp4',
        alt: 'Inside Inside',
        title: 'Inside Inside',
        description: 'Rapid, pendulum-style ball shifts using the inside of both feet.'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/008_Croqueta_Outside_left.mp4',
        alt: 'Croqueta Outside Left',
        title: 'Croqueta to Outside (Left)',
        description: 'Combine a La Croqueta with a quick outside foot exit to the left.'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/009_Croqueta_Outside_Right.mp4',
        alt: 'Croqueta Outside Right',
        title: 'Croqueta to Outside (Right)',
        description: 'Combine a La Croqueta with a quick outside foot exit to the right.'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/010_Inside_Outside.mp4',
        alt: 'Inside Outside',
        title: 'Inside Outside',
        description: 'Master tight spaces with smooth inside-to-outside alternating touches.'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/010_Inside_Outside_57004817.mp4',
        alt: 'Inside Outside Variation',
        title: 'Inside Outside Variation',
        description: 'Another progression of the inside-outside cut for speed and agility.'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/011_Sole_Roll_Stop.mp4',
        alt: 'Sole Roll Stop',
        title: 'Sole Roll Stop',
        description: 'Use the sole of the boot to drag the ball laterally and stop it dead.'
    },
    {
        id: 13,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/012_Sole_Rolls.mp4',
        alt: 'Sole Rolls',
        title: 'Sole Rolls',
        description: 'Continuous lateral dragging across the body utilizing solely the soles.'
    },
    {
        id: 14,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/013_Toe_Taps_Forward.mp4',
        alt: 'Toe Taps Forward',
        title: 'Toe Taps Forward',
        description: 'Quick alternating toe touches on top of the ball while maintaining forward momentum.'
    },
    {
        id: 15,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/014_Toe_Taps_Backwards.mp4',
        alt: 'Toe Taps Backwards',
        title: 'Toe Taps Backwards',
        description: 'Quick alternating toe touches on top of the ball while subtly retreating backwards.'
    },
    {
        id: 16,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/015_Roll_Stepover.mp4',
        alt: 'Roll Stepover',
        title: 'Roll Stepover',
        description: 'Deceive the opponent: roll the ball across the body, immediately followed by an explosive forward stepover.'
    },
    {
        id: 17,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/016_L_Drag_Push.mp4',
        alt: 'L Drag Push',
        title: 'L Drag Push',
        description: 'Drag the ball back in an L-shape behind the standing leg to instantly change direction.'
    },
    {
        id: 18,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/017_Backwards_L_Drag.mp4',
        alt: 'Backwards L Drag',
        title: 'Backwards L Drag',
        description: 'Perform the L Drag move continuously while moving backwards to evade immediate pressure.'
    },
    {
        id: 19,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/018_Inside_Foot_V_Cut.mp4',
        alt: 'Inside Foot V Cut',
        title: 'Inside Foot V Cut',
        description: 'Pull the ball back and push out diagonally using the inside of the foot, forming a V shape.'
    },
    {
        id: 20,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/019_Outside_Foot_V_Cut.mp4',
        alt: 'Outside Foot V Cut',
        title: 'Outside Foot V Cut',
        description: 'Pull the ball back and push out diagonally using the outside of the foot.'
    },
    {
        id: 21,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/020_Alternating_Feet_V_Cuts.mp4',
        alt: 'Alternating Feet V Cuts',
        title: 'Alternating V Cuts',
        description: 'Execute rapid V cuts seamlessly switching between right and left feet.'
    },
    {
        id: 22,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/021_Stepover_La_Croqueta.mp4',
        alt: 'Stepover La Croqueta',
        title: 'Stepover to La Croqueta',
        description: 'A powerful combo combining a deceptive stepover with a rapid two-touch shift.'
    },
    {
        id: 23,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/022_Inside_Pull_Push_left.mp4',
        alt: 'Inside Pull Push Left',
        title: 'Inside Pull Push (Left)',
        description: 'Roll back and instantly strike forward using the left foot inside.'
    },
    {
        id: 24,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/023_Inside_Pull_Push_right.mp4',
        alt: 'Inside Pull Push Right',
        title: 'Inside Pull Push (Right)',
        description: 'Roll back and instantly strike forward using the right foot inside.'
    },
    {
        id: 25,
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/32close/024_Outside_Pull_Push_right.mp4',
        alt: 'Outside Pull Push Right',
        title: 'Outside Pull Push (Right)',
        description: 'Roll back and sharply change direction with a right foot outside push.'
    }
];

export const jugglingDrills: DrillCard[] = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1518091043644-c1d44580d1adc?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/5_Easy_Beginner_Juggling/001_The_Toe_Bounce.mp4',
        alt: 'The Toe Bounce',
        title: 'The Toe Bounce',
        description: 'A fundamental beginner juggling move involving repetitive precise bounces off the toes.'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1518091043644-c1d44580d1adc?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/5_Easy_Beginner_Juggling/002_Half_Around_The_World.mp4',
        alt: 'Half Around The World',
        title: 'Half Around The World',
        description: 'A foundational trick crossing the leg halfway over the dropping ball.'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1518091043644-c1d44580d1adc?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/5_Easy_Beginner_Juggling/003_Crossover.mp4',
        alt: 'Crossover',
        title: 'Crossover',
        description: 'Cross one leg over the other while lifting the ball for advanced aerial control.'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1518091043644-c1d44580d1adc?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/5_Easy_Beginner_Juggling/004_Heel_Juggle.mp4',
        alt: 'Heel Juggle',
        title: 'Heel Juggle',
        description: 'Use the heel to pop the ball up from behind in mid-air.'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1518091043644-c1d44580d1adc?q=80&w=1000&auto=format&fit=crop',
        videoSrc: 'https://drills.fra1.cdn.digitaloceanspaces.com/videos/5_Easy_Beginner_Juggling/005_The_Slap.mp4',
        alt: 'The Slap',
        title: 'The Slap',
        description: 'Forcefully push the ball into the ground with the sole so it rebounds high for continuous juggling.'
    }
];

export const seriesList: DrillSeries[] = [
    {
        id: 'close-control-32-cones',
        title: '32 Close Control Drill Series',
        description: 'Master tight spaces and maximum ball control.',
        cards: closeControlDrills
    },
    {
        id: '5-easy-juggling',
        title: '5 Easy Beginner Juggling Tricks',
        description: 'Improve aerial dominance with foundational juggling tricks.',
        cards: jugglingDrills
    },
];
