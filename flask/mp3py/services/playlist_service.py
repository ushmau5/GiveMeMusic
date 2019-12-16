import requests

from bs4 import BeautifulSoup
from mp3py.models.video import Video


def get_playlist_video_info(playlist_id):
    playlist_url = f"https://www.youtube.com/playlist?list={playlist_id}"
    page = requests.get(playlist_url)
    soup = BeautifulSoup(page.content, 'html.parser')
    video_table = soup.find('table', id='pl-video-table')
    video_row = video_table.find_all('tr', class_='pl-video yt-uix-tile')
    videos = list()

    for row in video_row:
        try:
            title = row.attrs['data-title']
            url = f"https://www.youtube.com/watch?v={row.attrs['data-video-id']}"
            duration = row.find('td', class_='pl-video-time').find('span').get_text(strip=True)
            thumbnail_url = row.find('img').attrs['data-thumb']
        except AttributeError:
            ...

        videos.append(
            Video(
                title=title,
                url=url,
                duration=duration,
                thumbnail_url=thumbnail_url
            ))
    return videos
