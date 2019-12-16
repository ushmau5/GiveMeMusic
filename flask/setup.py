from setuptools import setup

setup(
   name='mp3py',
   version='1.0.0',
   description='YouTube Playlist to MP3',
   author='Oisin McNally',
   packages=['mp3py'],
   install_requires=[
        'aniso8601==8.0.0',
        'attrs==19.3.0',
        'beautifulsoup4==4.8.1',
        'bs4==0.0.1',
        'certifi==2019.9.11',
        'chardet==3.0.4',
        'Click==7.0',
        'Flask==1.1.1',
        'Flask-Cors==3.0.8',
        'flask-restplus==0.13.0',
        'gunicorn==20.0.4',
        'idna==2.8',
        'importlib-metadata==0.23',
        'itsdangerous==1.1.0',
        'Jinja2==2.10.3',
        'jsonschema==3.2.0',
        'MarkupSafe==1.1.1',
        'more-itertools==7.2.0',
        'pyrsistent==0.15.5',
        'pytz==2019.3',
        'requests==2.22.0',
        'six==1.13.0',
        'soupsieve==1.9.5',
        'urllib3==1.25.7',
        'Werkzeug==0.16.0',
        'youtube-dl==2019.11.5',
        'zipp==0.6.0'
   ]
)