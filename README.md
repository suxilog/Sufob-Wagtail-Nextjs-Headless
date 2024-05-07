# Sufob Wagtail Nextjs Headless Blog
Full-stack Wagtail + Nextjs(14) Headless Blog with preview mode

## Features
- **Full-stack Wagtail Headless Support**: Manages content via Wagtail and serves a dynamic frontend using Next.js.
- **New Next.js App Modes**: Integrates draft mode for headless content preview.
- **Docker Compose Support**: Simplifies building and deploying the project using Docker Compose.
- **Frontend Stage Deployment**: Supports multi-stage builds to optimize deployment processes.
- **Environment Variable Support**: Manages configurations securely and flexibly with environment variables.
- **Custom Page Data Fetch API**: Includes custom APIs for categories, tags, and preview pages.
- **Blog Commenting Feature**: Integrates a commenting system to foster user interaction.
- **Let's Encrypt SSL Support**: Automates HTTPS certificate management for secure communication.
- **TailwindCSS Integration**: Utilizes TailwindCSS for modern, responsive design without sacrificing performance.

## Preparation
Before starting with the project setup, ensure you have the following software installed:
- Docker
- Docker Compose
- A code editor like VS Code

### Configuring Environment Variables
1. Modify wagtail `.env.dev` file in the `deploy` directory of the project and fill in the following necessary environment variables:
```plaintext
# .env sample for development
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=127.0.0.1,0.0.0.0,backend
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=user@example.com
EMAIL_HOST_PASSWORD=password
DEFAULT_FROM_EMAIL=webmaster@example.com
ADMIN_EMAIL=admin@example.com
EMAIL_SUBJECT_PREFIX=[Your Site] 
CSRF_TRUSTED_ORIGINS=https://example.com
```
2. Modify nextjs `.env.development` file in `frontend` directory, replace the frontend link with yours or use [dev.sufob.com](127.0.0.1)(127.0.0.1) for development

```plaintext
DEV=true
NEXT_PUBLIC_BASE_URL=http://dev.sufob.com
NEXT_PUBLIC_API_URL=http://dev.sufob.com/_api
metadataBase=http://dev.sufob.com
SITE_URL=http://dev.sufob.com
```
3. Modify database `db.env.dev` file in `deploy` folder. Change the password.
```plaintext
POSTGRES_DB=sufob_next_blog
POSTGRES_USER=sufob_next_blog
# change default password
POSTGRES_PASSWORD=some_password_string
HOST=pg_db_dev
PORT=5432
```
## Quick Start
Clone and start the project:
```bash
git clone https://github.com/suxilog/Sufob-Wagtail-Nextjs-Headless.git
cd Sufob-Wagtail-Nextjs-Headless
cd frontend
npm install
cd ../
# For development
make start-dev-build
# For production
# make start-prod-build
```
Backend login address: http://dev.sufob.com/sufobadmin    

Use `python manage.py createsuperuser` in backend container to create new user.

Add a child page for Home page, let's say `Blog` (Blog Index) page with slug `blog`.
## Project Structure

- `/frontend`: Stores Next.js React components.
- `/backend`: Stores wagtail backend.
- `/deploy`: Deploy configuration files.
- `/docker`: Contains Docker-related configuration files.
- `Makefile`: Docker command line.

## Functionality
  - **Edit Post**: Edit post in wagtail cms and use preview button to see latest revision.   
  - **Cron Job**: Use ofelia to run cron job. Config jobs in docker compose yml file.
  - **Let's Encrypt**: Use Let's encrypt to apply ssl.
  


## Development and Contribution Guidelines
We welcome contributions from the community, whether it's new features, bug fixes, or documentation improvements. Please adhere to our contribution guidelines:

- **Code Style**: Follow the established code style and naming conventions of the project.
- **Commit Messages**: Provide clear commit messages that explain the changes.
- **Pull Requests**: Ensure PRs are clear, targeted, and only include relevant changes.    
  
### Deployment
Detail the steps to deploy the project to production, particularly how to use Docker and configure SSL with Let's Encrypt.
1. Config nginx config and Let's encrypt.    
We need to up container and run Certbot command to apply SSL certificate manually for the first time.

2. Build the dev container    
Use `make start-dev-build` to run development container.    
3. Write some awsome article and preview
#### A list of running containers
- **For Development**
```
# build container
make build-dev

# or up with build
make start-dev-build

# start container
make start-dev

# stop container
make stop-dev
```
- **For Production**
```
# build container
make build-prod

# or up with build
make start-prod-build

# start container
make start-prod

# stop container
make stop-prod
```
## TODO List
- Unit test
- Translate
- Demo
- ...
## License
This project is licensed under the MIT License.    
(Leave a friendly link to [www.sufob.com](https://www.sufob.com) if possible.)

## Contact and Contributors
If you have any questions or would like to contribute, please contact us via:
- **Email**: [sue@sufob.com](mailto:sue@sufob.com)
- **GitHub**: [GitHub Profile](https://github.com/suxilog)

## Available for Freelance or Contract Work
As the creator and maintainer of this project, I specialize in full-stack development with a focus on technologies such as Django, Wagtail, Next.js, and TailwindCSS. If you are looking for a committed and detail-oriented professional for your freelance or contract projects, please feel free to reach out.

### Contact Me
For business inquiries or to discuss your project needs, you can contact me via:

- **Email**: [sue@sufob.com](mailto:sue@sufob.com)    
- **LinkedIn**: [Charlie Sue](https://www.linkedin.com/in/charlie-sue-329948174)    
  
I look forward to collaborating with you to bring your vision to life!
---