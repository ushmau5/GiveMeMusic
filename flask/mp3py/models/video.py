class Video:
    def __init__(self, title, url, duration=None, thumbnail_url=None):
        self.title = title
        self.url = url
        self.duration = duration
        self.thumbnail_url = thumbnail_url

    def __eq__(self, other):
        if not isinstance(other, Video):
            return NotImplemented
        return self.url == other.url
