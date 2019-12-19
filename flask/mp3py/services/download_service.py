import youtube_dl
import os
import uuid
import shutil
import zipfile


class DownloadService:
    def __init__(self, url_list):
        self.url_list = url_list
        self.folder_id = str(uuid.uuid4())
        self.tmp_path = f'./tmp/{self.folder_id}'
        self.zip_path = f'./zips/{self.folder_id}.zip'

    def download_videos(self):
        ydl_opts = {
            'outtmpl': f'{self.tmp_path}/%(title)s.%(ext)s',
            'ignoreerrors': True,
            'nooverwrites': True,
            'geo_bypass': True,
            'source_address': '0.0.0.0'
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download(self.url_list)

    def convert_video_to_mp3(self):
        files = os.listdir(self.tmp_path)

        for file_name in files:
            if not file_name.startswith('.'):
                file, extension = os.path.splitext(file_name)
                # Convert video into .wav file
                os.system(f"ffmpeg -i {self.tmp_path}/'{file}{extension}' {self.tmp_path}/'{file}.wav'")
                # Convert .wav into final .mp3 file
                os.system(f"lame -V2 {self.tmp_path}/'{file}.wav' {self.tmp_path}/'{file}.mp3'")
                print(f"{file_name} successfully converted into MP3!")
        self._cleanup_after_convert()

    def _cleanup_after_convert(self):
        files = os.listdir(self.tmp_path)

        for file_name in files:
            if not file_name.endswith('.mp3'):
                os.remove(f"{self.tmp_path}/{file_name}")

    def zip_download_folder(self):
        zf = zipfile.ZipFile(self.zip_path, "w")
        for dirname, subdirs, files in os.walk(self.tmp_path):
            for filename in files:
                zf.write(os.path.join(dirname, filename))
        zf.close()
        self._cleanup_tmp()

    def _cleanup_tmp(self):
        shutil.rmtree(self.tmp_path, ignore_errors=True)

