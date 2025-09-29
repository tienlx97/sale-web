@echo off
REM --- Di chuyển thẳng vào thư mục project ---
cd /d E:\work\DNC\sale-web

REM --- Chạy web server tĩnh từ thư mục dist ---
echo Starting static server on port 4000...
pnpx serve dist -l 4000 -s

pause
