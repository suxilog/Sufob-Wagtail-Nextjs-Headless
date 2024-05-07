#!/bin/sh
set -e

echo "Starting entrypoint.sh"

if [ "$HOST" = "pg_db" ]
then
    echo "Waiting for postgresql..."

    while ! nc -z $HOST $PORT; do
        sleep 0.1
    done

    echo "Postgresql started"
fi

# Ensure sufob has ownership over the necessary directories
if [ "$(ls -ld /var/log/gunicorn | awk '{print $3}')" != 'sufob' ]; then
    chown -R sufob:sufob /var/log/gunicorn
    
    echo "Changed ownership of /var/log/gunicorn"
fi

# change ownership of media and static files
if [ "$(ls -ld /home/backend/media | awk '{print $3}')" != 'sufob' ]; then
    chown -R sufob:sufob /home/backend/media
    echo "Changed ownership of /home/backend/media"
fi
chmod -R 755 /home/backend/media
if [ "$(ls -ld /home/backend/static | awk '{print $3}')" != 'sufob' ]; then
    chown -R sufob:sufob /home/backend/static
    echo "Changed ownership of /home/backend/static"
fi




# set an appropriate umask (if one isn't set already)
um="$(umask)"
if [ "$um" = '0022' ]; then
	umask 0077
fi

# run commands as sufob user
gosu sufob python manage.py migrate
gosu sufob python manage.py collectstatic --no-input --clear
echo "Collecting static files...finished"
gosu sufob python manage.py update_index
echo "Updating search index...finished"

# Start Gunicorn as sufob user
exec gosu sufob "$@"
