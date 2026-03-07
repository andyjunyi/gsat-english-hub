@echo off
cd /d "C:\Users\Andy\Desktop\gsat-english-hub"
git add .
set /p msg=Commit message: 
git commit -m "%msg%"
git push
echo.
echo Done! Vercel will auto-deploy shortly.
pause
