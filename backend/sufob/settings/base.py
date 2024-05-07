"""
Django settings for sufob project.

Generated by 'django-admin startproject' using Django 4.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from unittest.mock import DEFAULT

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(PROJECT_DIR)

env = os.environ.copy()
if "SECRET_KEY" in env:
    SECRET_KEY = env["SECRET_KEY"]

if "ALLOWED_HOSTS" in env:
    ALLOWED_HOSTS = env["ALLOWED_HOSTS"].split(",")
    print(ALLOWED_HOSTS)

if "DEBUG" in env:
    DEBUG = env["DEBUG"] == "True"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/


# Application definition

INSTALLED_APPS = [
    "home",
    "search",
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail.admin",
    "wagtail.api.v2",
    "wagtail",
    "modelcluster",
    "taggit",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "blog",
    "streams",
    "sufob_settings",
    "sufob_users",
    "wagtailmarkdown",
    "rest_framework",
    "sufob_comments",
    "wagtail.contrib.modeladmin",
    "dbbackup",
    "wagtail_headless_preview",
]

MIDDLEWARE = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
]

ROOT_URLCONF = "sufob.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(PROJECT_DIR, "templates"),
            os.path.join(BASE_DIR, "templates"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "sufob.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env["POSTGRES_DB"],
        "USER": env["POSTGRES_USER"],
        "PASSWORD": env["POSTGRES_PASSWORD"],
        "HOST": env["HOST"],
        "PORT": env["PORT"],
    },
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, "static"),
]

# ManifestStaticFilesStorage is recommended in production, to prevent outdated
# JavaScript / CSS assets being served from cache (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/4.2/ref/contrib/staticfiles/#manifeststaticfilesstorage
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"


# Wagtail settings

WAGTAIL_SITE_NAME = "sufob"
# Search
# https://docs.wagtail.org/en/stable/topics/search/backends.html

WAGTAILSEARCH_BACKENDS = {
    "default": {
        "BACKEND": "wagtail.search.backends.database",
        "SEARCH_CONFIG": "chinese",
        "AUTO_UPDATE": True,
        "ATOMIC_REBUILD": True,
    }
}

# Base URL to use when referring to full URLs within the Wagtail admin backend -
# e.g. in notification emails. Don't include '/admin' or a trailing slash
WAGTAILADMIN_BASE_URL = "http://example.com"
# settings.py

WAGTAILMARKDOWN = {
    "autodownload_fontawesome": True,
    "allowed_tags": ["i"],  # optional. a list of HTML tags. e.g. ['div', 'p', 'a']
    "allowed_styles": ["scroll-mt-[120px]"],  # optional. a list of styles
    "allowed_attributes": {
        "i": ["aria-hidden"],
    },  # optional. a dict with HTML tag as key and a list of attributes as value
    "allowed_settings_mode": "extend",  # optional. Possible values: "extend" or "override". Defaults to "extend".
    "extensions": [
        "toc",
        "sane_lists",
    ],  # optional. a list of python-markdown supported extensions
    "extension_configs": {
        "pymdownx.arithmatex": {"generic": True},
    },  # optional. a dictionary with the extension name as key, and its configuration as value
    "extensions_settings_mode": "extend",  # optional. Possible values: "extend" or "override". Defaults to "extend".
    "tab_length": 4,
}
WAGTAILIMAGES_EXTENSIONS = ["gif", "jpeg", "jpg", "png", "svg", "webp", "avif"]


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env["EMAIL_HOST"]
EMAIL_PORT = env["EMAIL_PORT"]
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = env["EMAIL_HOST_PASSWORD"]

DEFAULT_FROM_EMAIL = env["DEFAULT_FROM_EMAIL"]
ADMIN_EMAIL = env["ADMIN_EMAIL"]
EMAIL_SUBJECT_PREFIX = env["EMAIL_SUBJECT_PREFIX"]


# Django dbbackup设置
DBBACKUP_CONNECTORS = {
    "default": {
        "NAME": env["POSTGRES_DB"],
        "USER": env["POSTGRES_USER"],
        "PASSWORD": env["POSTGRES_PASSWORD"],
        "HOST": env["HOST"],
        "PORT": env["PORT"],
        "CONNECTOR": "dbbackup.db.postgresql.PgDumpConnector",
        "DROP": False,
    }
}
DBBACKUP_STORAGE = "django.core.files.storage.FileSystemStorage"
DBBACKUP_STORAGE_OPTIONS = {"location": "/home/dbbackups"}
DBBACKUP_FILENAME_TEMPLATE = "S-{databasename}-{datetime}.{extension}"

# Wagtail preview
WAGTAIL_HEADLESS_PREVIEW = {
    "CLIENT_URLS": {
        "default": env["FRONTEND_URL"] + "/api/draft/",
    },  # defaults to an empty dict. You must at the very least define the default client URL.
    "SERVE_BASE_URL": env["FRONTEND_URL"],  # can be used for HeadlessServeMixin
    "REDIRECT_ON_PREVIEW": True,  # set to True to redirect to the preview instead of using the Wagtail default mechanism
    "ENFORCE_TRAILING_SLASH": False,  # set to False in order to disable the trailing slash enforcement
}


if "CSRF_TRUSTED_ORIGINS" in env:
    CSRF_TRUSTED_ORIGINS = env["CSRF_TRUSTED_ORIGINS"].split(",")

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "file": {
            "level": "ERROR",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "/var/log/gunicorn/sufob_blog_errors.log",
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 50,  # keep 5 backup logs
            "formatter": "verbose",
        },
        "mail_admins": {
            "level": "ERROR",
            "class": "django.utils.log.AdminEmailHandler",
            "include_html": True,
        },
    },
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s][%(process)d][%(levelname)s][%(name)s] %(message)s"
        },
    },
    "loggers": {
        "sufob": {
            "handlers": ["console", "file", "mail_admins"],
            "level": "INFO",
            "propagate": False,
        },
        "wagtail": {
            "handlers": ["console", "file", "mail_admins"],
            "level": "INFO",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["console", "file", "mail_admins"],
            "level": "WARNING",
            "propagate": False,
        },
        "django.security": {
            "handlers": ["console", "file", "mail_admins"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}