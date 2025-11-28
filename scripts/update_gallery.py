import json
import os

# Existing files for Day 27 (from my previous list_dir)
day2_files = [
    "IMG_0483.jpg", "IMG_0543.jpg", "IMG_0545.jpg", "IMG_0562.jpg", "IMG_0579.jpg", 
    "IMG_0580.jpg", "IMG_0581.jpg", "IMG_0582.jpg", "IMG_0584.jpg", "IMG_0585.jpg", 
    "IMG_0586.jpg", "IMG_0587.jpg", "IMG_0588.jpg", "IMG_0612.jpg", "IMG_0614.jpg", 
    "IMG_0632.jpg", "IMG_0633.jpg", "IMG_0634.jpg", "IMG_0635.jpg", "IMG_0636.jpg", 
    "IMG_0637.jpg", "IMG_0638.jpg", "IMG_0639.jpg", "IMG_0640.jpg", "IMG_0652.jpg", 
    "IMG_0653.jpg", "IMG_0654.jpg", "IMG_0655.jpg", "IMG_0656.jpg", "IMG_0657.jpg", 
    "IMG_0658.jpg", "IMG_0683.jpg", "IMG_0685.jpg", "IMG_0687.jpg", "IMG_0690.jpg", 
    "IMG_0694.jpg", "IMG_0696.jpg", "IMG_0699.jpg", "IMG_0702.jpg", "IMG_0785.jpg", 
    "IMG_0786.jpg", "IMG_0787.jpg", "IMG_0788.jpg", "IMG_0789.jpg", "IMG_0790.jpg", 
    "IMG_0791.jpg", "IMG_0792.jpg", "IMG_0793.jpg", "IMG_0899.jpg", "IMG_0916.jpg", 
    "IMG_0917.jpg", "IMG_0919.jpg", "IMG_0920.jpg", "IMG_0921.jpg", "IMG_0922.jpg", 
    "IMG_0923.jpg", "IMG_0924.jpg", "IMG_0925.jpg", "IMG_0927.jpg", "IMG_0928.jpg", 
    "IMG_0929.jpg", "IMG_1057.jpg", "IMG_1061.jpg"
]

json_path = os.path.join(os.path.dirname(__file__), '..', 'assets', 'js', 'gallery.json')

try:
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    data = []

# Check if day 27 images are already there to avoid duplicates
existing_srcs = {item['src'] for item in data}

new_entries = []
for filename in day2_files:
    src = f"assets/img/galeria/dia_02/{filename}"
    if src not in existing_srcs:
        new_entries.append({
            "src": src,
            "alt": f"Foto do dia 27 - {filename}",
            "span": "",
            "day": 27
        })

data.extend(new_entries)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_entries)} new entries to gallery.json")
