### To Run
    gunicorn --bind 0.0.0.0:5000 --chdir mp3py wsgi:app

### Docker
    docker build -t flask-ffmpeg .
    docker run -d -p 5000:5000 flask-ffmpeg