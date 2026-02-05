Project deployment notes
========================

What I changed locally
- Updated `server.js` to serve the React `build/` in `hello-world/build` and added an `/api` endpoint at `/api`.
- Added root `package.json` with a `postinstall` that installs and builds the React app.

Run locally
-----------

1. Start frontend + backend locally (dev):

```powershell
cd "hello-world"
npm install
npm start
```

2. Start backend only (root):

```powershell
npm install
node server.js
```

The backend will be at `http://localhost:2300`. The React dev server runs at `http://localhost:3000` when started inside `hello-world`.

Git & Deployment steps I prepared
- I initialized a local git repo and created commits with all files.
- I added a `Dockerfile` to build the React app and run `server.js`.
- I added a GitHub Actions workflow to build the frontend on push.

How to publish to GitHub (run locally):

```powershell
cd "C:\path\to\SclableService"
git init
git add .
git commit -m "Initial project and deployment files"
# create repo on GitHub (replace USER/REPO)
git remote add origin git@github.com:USER/REPO.git
git branch -M main
git push -u origin main
```

Deploy to Render (example):

- Create a new Web Service on Render and connect your GitHub repository.
- Set the build command to `npm install` (postinstall builds client) and start command to `npm start`.

Docker deploy locally (test):

```bash
docker build -t sclable-service .
docker run -p 2300:2300 sclable-service
```

If you want, I can:
- Attempt to create the GitHub repo for you (requires a GitHub token).
- Deploy to Render/Railway if you provide account access or authorize me.

Deploying (suggestions)
-----------------------

Option A — Render / Railway (recommended):
- Push repo to GitHub.
- Create a new Web Service on Render (or Railway) and connect GitHub repo.
- Set the root build command to `npm install` (the `postinstall` will build the React app).
- Set the start command to `npm start`.

Option B — Docker:
- Create a Dockerfile that builds the React app and runs `node server.js`.

Notes for submission
--------------------
- Share the GitHub repository link.
- Share the deployed service URL (Render/Railway) or VM IP.
- Include screenshots of code, running app (browser) and Render/Railway dashboard.
