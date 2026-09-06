import os
import subprocess
import sys
import time

VIDEOS_DIR = "public/videos"
FFMPEG = "/opt/homebrew/bin/ffmpeg"

def check_moov_in_header(file_path):
    with open(file_path, "rb") as f:
        header = f.read(150)
        return b"moov" in header

def format_size(bytes_size):
    return f"{bytes_size / (1024 * 1024):.2f} MB"

def optimize_video(input_path, is_preview=False):
    orig_size = os.path.getsize(input_path)
    temp_path = input_path + ".temp.mp4"
    
    if is_preview:
        cmd = [
            FFMPEG, "-y", "-i", input_path,
            "-vf", "scale='min(480,iw)':-2",
            "-an",
            "-c:v", "libx264",
            "-crf", "25",
            "-preset", "fast",
            "-movflags", "+faststart",
            temp_path
        ]
    else:
        cmd = [
            FFMPEG, "-y", "-i", input_path,
            "-vf", "scale='min(720,iw)':-2",
            "-c:v", "libx264",
            "-crf", "23",
            "-preset", "fast",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            temp_path
        ]

    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if res.returncode == 0 and os.path.exists(temp_path) and os.path.getsize(temp_path) > 10000:
        if check_moov_in_header(temp_path):
            new_size = os.path.getsize(temp_path)
            os.replace(temp_path, input_path)
            return orig_size, new_size, True
        else:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return orig_size, orig_size, False
    else:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return orig_size, orig_size, False

def main():
    if not os.path.exists(VIDEOS_DIR):
        print("Videos directory not found!")
        sys.exit(1)

    subdirs = sorted([d for d in os.listdir(VIDEOS_DIR) if os.path.isdir(os.path.join(VIDEOS_DIR, d))])
    print(f"Starting optimization for {len(subdirs)} video projects with FastStart...\n")
    
    total_orig = 0
    total_new = 0
    start_time = time.time()

    for idx, d in enumerate(subdirs, 1):
        dir_path = os.path.join(VIDEOS_DIR, d)
        video_path = os.path.join(dir_path, "video.mp4")
        preview_path = os.path.join(dir_path, "preview.mp4")
        
        print(f"[{idx}/{len(subdirs)}] Processing {d}...")

        if os.path.exists(video_path):
            v_orig, v_new, v_success = optimize_video(video_path, is_preview=False)
            total_orig += v_orig
            total_new += v_new
            v_savings = (1 - (v_new / v_orig)) * 100 if v_orig > 0 else 0
            status = "✓ FastStart OK" if v_success else "✗ Failed"
            print(f"   - video.mp4:   {format_size(v_orig)} -> {format_size(v_new)} ({v_savings:.1f}% saved) [{status}]")

        if os.path.exists(preview_path):
            p_orig, p_new, p_success = optimize_video(preview_path, is_preview=True)
            total_orig += p_orig
            total_new += p_new
            p_savings = (1 - (p_new / p_orig)) * 100 if p_orig > 0 else 0
            status = "✓ FastStart OK" if p_success else "✗ Failed"
            print(f"   - preview.mp4: {format_size(p_orig)} -> {format_size(p_new)} ({p_savings:.1f}% saved) [{status}]")

    elapsed = time.time() - start_time
    total_saved = (1 - (total_new / total_orig)) * 100 if total_orig > 0 else 0
    print("\n" + "="*50)
    print(f"OPTIMIZATION COMPLETE in {elapsed:.1f}s!")
    print(f"Original total size: {format_size(total_orig)}")
    print(f"New total size:      {format_size(total_new)}")
    print(f"Total data saved:    {format_size(total_orig - total_new)} ({total_saved:.1f}% reduction)")
    print("="*50)

if __name__ == "__main__":
    main()
