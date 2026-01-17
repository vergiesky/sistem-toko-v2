from app import create_app

# Vercel Flask entrypoint expects a module-level "app".
app = create_app()
