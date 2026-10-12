# Vintage Romantic Scrapbook — Flask

Website scrapbook romantis bergaya vintage dengan halaman buku yang dapat dibalik menggunakan CSS, HTML dan Flask. Tidak memakai JavaScript.

## Isi project

- `app.py` — aplikasi Flask
- `requirements.txt` — dependensi Python (Flask dan Gunicorn)
- `templates/index.html` — struktur halaman
- `static/css/style.css` — desain dan animasi halaman
- `static/images/` — tempat foto kenangan
- `static/audio/` — tempat file musik

## Menambahkan foto dan musik

1. Masukkan foto milik sendiri ke `static/images/` dengan nama `foto-kenangan-1.jpg`.
2. Masukkan file musik MP3 yang kamu punya izin untuk membagikannya ke `static/audio/` dengan nama `lagu.mp3`.
3. Jika nama file diubah, sesuaikan juga referensinya di `templates/index.html`.

Foto dan musik tidak disertakan dalam paket ini; tambahkan sendiri bila diperlukan.

## Menjalankan di Windows

1. Instal Python 3 dari https://www.python.org/downloads/.
2. Ekstrak ZIP ini.
3. Buka PowerShell atau terminal di folder `vintage_scrapbook`.
4. Jalankan perintah berikut satu per satu:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py app.py
```

Jika PowerShell memblokir aktivasi lingkungan virtual, kamu bisa memakai Command Prompt dan menjalankan `.venv\Scripts\activate.bat` sebagai gantinya.

5. Buka `http://127.0.0.1:5000` di browser.
6. Untuk menghentikan server, tekan `Ctrl+C` di terminal.

## Membagikan kepada orang lain

- **Berbagi source code:** kirim file ZIP ini atau unggah isi folder ke repositori GitHub.
- **Agar bisa dibuka melalui tautan internet:** aplikasi Flask perlu dijalankan pada layanan hosting/deployment. Contoh konfigurasi Render:
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `gunicorn app:app`
- Saat di-hosting, siapa pun yang memiliki URL publik dapat membuka situs. Jangan masukkan informasi pribadi atau foto orang lain tanpa izin.

## Catatan

- HTML dan CSS dipisahkan.
- Membalik halaman memakai checkbox dan animasi CSS, bukan JavaScript.
- Musik menggunakan kontrol audio bawaan browser; pengunjung perlu menekan tombol putar.
- Font Google Fonts memerlukan internet; font cadangan akan digunakan jika tidak tersedia.


## Tampilan responsif
Website menggunakan CSS responsif untuk menyesuaikan tampilan pada desktop, tablet, dan layar HP. Efek membalik halaman tetap menggunakan checkbox HTML dan CSS tanpa JavaScript.
