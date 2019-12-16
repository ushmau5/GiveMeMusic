FROM python:3.6-alpine

RUN apk update
RUN apk add ffmpeg
RUN ffmpeg -version

COPY mp3py /mp3py
COPY requirements.txt /
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--chdir", "mp3py", "wsgi:app"]
