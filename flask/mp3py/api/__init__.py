from flask_restplus import Api

from mp3py.api.playlist_api import ns as playlist_ns
from mp3py.api.download_api import ns as download_ns

api = Api(
    title='YouTube Playlist Downloader',
    version='1.0',
    description='A Python application for downloading YouTube playlists as mp3'
)

api.add_namespace(playlist_ns)
api.add_namespace(download_ns)
