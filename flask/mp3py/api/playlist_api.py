from flask_restplus import Namespace, Resource, fields, marshal_with
from mp3py.services.playlist_service import get_playlist_video_info

ns = Namespace("playlist", description="Playlist APIs")

video_fields = ns.model("Video", {
    'title': fields.String(description="Title of the video"),
    'url': fields.String(description="URL of the video"),
    'duration': fields.String(description="Duration of the video"),
    'thumbnail_url': fields.String(description="Thumbnail URL of the video")
})


@ns.route('/<playlist_id>', methods=['GET'])
@ns.doc(params={'playlist_id': 'https://www.youtube.com/playlist?list=PLAYLIST_ID_IS_HERE'})
class PlaylistAPI(Resource):
    @marshal_with(video_fields)
    def get(self, playlist_id):
        playlist = get_playlist_video_info(playlist_id=playlist_id)
        return playlist, 200
