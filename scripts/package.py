from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import hashlib, json
root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / 'manifest.json').read_text())
version = manifest['version']
out = root / 'dist'
out.mkdir(exist_ok=True)
archive = out / f'feishu-publisher-{version}.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED) as bundle:
    for name in ['main.js', 'manifest.json', 'LICENSE', 'THIRD_PARTY_NOTICES.md']:
        info = ZipInfo('feishu-publisher/' + name, (1980, 1, 1, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        bundle.writestr(info, (root / name).read_bytes())
files = [root / 'main.js', root / 'manifest.json', archive]
(out / 'SHA256SUMS').write_text(''.join(hashlib.sha256(file.read_bytes()).hexdigest() + '  ' + file.name + '\n' for file in files))
print(archive.name)
