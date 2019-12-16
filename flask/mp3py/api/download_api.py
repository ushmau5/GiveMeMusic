import os

from flask import send_from_directory, after_this_request
from flask_restplus import Namespace, Resource, fields
from mp3py.services.download_service import DownloadService

ns = Namespace("download", description="Download APIs")

input_downloads_post = ns.model("InputDownload", {
    'url_list': fields.List(
        fields.String(description="url of YouTube video")
    )
})

output_downloads_post = ns.model("OutputDownload", {
    'download_id': fields.String(description="id of the download resource")
})


@ns.route("", methods=['POST'])
class CreateDownloadAPI(Resource):
    @ns.expect(input_downloads_post)
    @ns.marshal_with(output_downloads_post)
    def post(self):
        payload = self.api.payload
        url_list = payload.get('url_list')
        downloader = DownloadService(url_list)
        downloader.download_videos()
        downloader.convert_video_to_mp3()
        downloader.zip_download_folder()

        return {'download_id': downloader.folder_id}, 201


@ns.route("/<download_id>", methods=['GET'])
@ns.doc(params={'download_id': 'id of the download resource'})
class GetDownloadAPI(Resource):
    def get(self, download_id):
        filename = f"{download_id}.zip"

        @after_this_request
        def delete_zip(response):
            os.remove(f"./zips/{filename}")
            return response

        return send_from_directory(directory="./zips",
                                   filename=filename,
                                   mimetype="application/zip")
