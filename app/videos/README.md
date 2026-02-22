# Video Cards Guide

This document explains how to add new video cards to the videos page.

## Prerequisites: AWS CLI Setup for DigitalOcean Spaces

To list video files from the CDN, you need the AWS CLI configured for DigitalOcean Spaces.

### Install AWS CLI

```bash
# Download and install AWS CLI v2
cd /tmp
curl -s "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -q -o awscliv2.zip
sudo ./aws/install --update
```

### Configure DigitalOcean Spaces Profile

```bash
aws --profile do-tor1 configure set aws_access_key_id <YOUR_ACCESS_KEY>
aws --profile do-tor1 configure set aws_secret_access_key <YOUR_SECRET_KEY>
aws --profile do-tor1 configure set region fra1
```
aws --profile do-tor1 configure set aws_access_key_id DO801VRVME4JU3PA9C8G
aws --profile do-tor1 configure set aws_secret_access_key KP19PMSnIkto2+I3rlvNyyeqfbTxE75XI/fDEm9V2eU
aws --profile do-tor1 configure set endpoint_url https://fra1.digitaloceanspaces.com

## Listing Video Files

To see what videos are available in a folder:

```bash
aws --profile do-tor1 --endpoint-url https://fra1.digitaloceanspaces.com s3 ls s3://drills/videos/<FOLDER_NAME>/
```

Example:
```bash
aws --profile do-tor1 --endpoint-url https://fra1.digitaloceanspaces.com s3 ls s3://drills/videos/5_Easy_Beginner_Juggling/
```

## Adding a New Video Card

When you have a DigitalOcean Spaces URL like:
```
https://drills.fra1.cdn.digitaloceanspaces.com/videos/<FOLDER_NAME>/
```

### Step 1: List the videos

```bash
aws --profile do-tor1 --endpoint-url https://fra1.digitaloceanspaces.com s3 ls s3://drills/videos/<FOLDER_NAME>/
```

### Step 2: Add a new entry to `VIDEO_COURSES` array in `page.tsx`

```typescript
{
    title: "Your Video Course Title",
    description: "A brief description of what viewers will learn.",
    badge: "New", // Options: "New", "Popular", "Beginner", "Premium", etc.
    thumbnailUrl:
        "https://drills.fra1.cdn.digitaloceanspaces.com/videos/<FOLDER_NAME>/<FIRST_VIDEO>.mp4#t=0.1",
    videos: [
        {
            label: "Human Readable Title",
            url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/<FOLDER_NAME>/<FILENAME>.mp4",
        },
        // ... more videos
    ],
},
```

### Important Notes

1. **Thumbnail URL**: Add `#t=0.1` at the end to capture a frame from the video as thumbnail
2. **URL Encoding**: If filenames contain spaces, URL-encode them (e.g., `Half%20Around%20The%20World.mp4`)
3. **Label**: Use a human-readable title without file prefixes (e.g., "Half Around The World" not "002_Half Around The World")
4. **Position**: Add the new entry to the `VIDEO_COURSES` array in `page.tsx`

## Example Workflow

**User request:** "Create a new card using https://drills.fra1.cdn.digitaloceanspaces.com/videos/NewDrill/"

**Steps:**
1. Extract folder name: `NewDrill`
2. List files:
   ```bash
   aws --profile do-tor1 --endpoint-url https://fra1.digitaloceanspaces.com s3 ls s3://drills/videos/NewDrill/
   ```
3. Note the video filenames from the output
4. Add a new entry to `VIDEO_COURSES` array with proper titles and URLs
5. Verify at http://localhost:3000/videos

## File Structure Reference

```
app/videos/
├── page.tsx      # Main videos page with VIDEO_COURSES array
└── README.md     # This file
```

The `VIDEO_COURSES` array in `page.tsx` contains all video course cards. Each course has:
- `title`: Course name displayed on the card
- `description`: Brief summary shown below title
- `badge`: Small label (e.g., "New", "Popular", "Beginner")
- `thumbnailUrl`: Video URL with `#t=0.1` for thumbnail preview
- `videos`: Array of `{ label, url }` objects for each video in the course
