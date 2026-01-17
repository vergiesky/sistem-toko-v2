# sistem-toko-v2

Aplikasi kasir/toko sederhana dengan frontend React + Vite dan backend Flask.

## Perbedaan Utama vs `sistem-toko`

- **Backend**: `sistem-toko-v2` memakai Flask modular bergaya MVC, sedangkan `sistem-toko` memakai Laravel.
- **Frontend**:
  - Riwayat nota sekarang mendukung cetak langsung dari history (halaman print khusus).
  - Preview/cetak nota menampilkan detail pelanggan (nama perusahaan dan alamat) bila tersedia.
  - Draft nota disimpan di `localStorage`, otomatis dipulihkan saat reload, dan dibersihkan setelah cetak sukses.
  - Pagination dan filter untuk barang/customer/nota history berpindah ke server (API).

## Struktur Folder

- `frontend/` aplikasi web (React + Vite).
- `backend/` API server (Flask).

## Setup

1) **Backend**
   - Buat virtualenv lalu install dependencies.
   - Salin `.env.example` menjadi `.env` dan sesuaikan `SUPABASE_URL`.
2) **Frontend**
   - Salin `frontend/.env.example` menjadi `frontend/.env` lalu sesuaikan `VITE_API_BASE_URL`.
3) Jalankan aplikasi.

## Menjalankan Backend

```bash
python run.py
```

## Migrations

Jika database baru masih kosong, jalankan upgrade untuk membuat schema.

```bash
set FLASK_APP=run.py
flask db upgrade
```

## PowerShell

Jika memakai PowerShell, gunakan:

```powershell
$env:FLASK_APP="run.py"
python -m flask db upgrade
```
