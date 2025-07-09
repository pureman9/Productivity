# Deployment Guide

## Cloud Deployment Options

### 1. Vercel (Recommended for Next.js)

#### Quick Deploy
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd Productivity
vercel
```

#### Manual Setup
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables if needed
4. Deploy automatically on push to main branch

### 2. Docker Deployment

#### Local Docker
```bash
# Build and run locally
docker build -t productivity-app .
docker run -p 3000:3000 productivity-app

# Or use Docker Compose
docker-compose up -d
```

#### Cloud Platforms with Docker

**AWS ECS:**
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
docker tag productivity-app:latest your-account.dkr.ecr.us-east-1.amazonaws.com/productivity-app:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/productivity-app:latest
```

**Google Cloud Run:**
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/productivity-app
gcloud run deploy productivity-app --image gcr.io/PROJECT-ID/productivity-app --platform managed
```

**Azure Container Instances:**
```bash
# Build and push to ACR
az acr build --registry yourregistry --image productivity-app .
az container create --resource-group myResourceGroup --name productivity-app --image yourregistry.azurecr.io/productivity-app:latest --dns-name-label productivity-app --ports 3000
```

### 3. Railway

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Deploy:
```bash
railway login
railway init
railway up
```

### 4. Render

1. Connect GitHub repository
2. Select "Web Service"
3. Choose Node.js environment
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`

### 5. Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add redirect rule: `/* /index.html 200`

## Environment Variables

Create `.env.local` for local development:
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

For production, set these in your cloud platform:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## Health Check

The application includes a health check endpoint at `/api/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "production"
}
```

## Monitoring

### Vercel Analytics
- Built-in analytics and performance monitoring
- Real-time insights and error tracking

### Docker Monitoring
```bash
# Check container health
docker ps
docker logs productivity-app

# Monitor resources
docker stats productivity-app
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version compatibility
2. **Port conflicts**: Ensure port 3000 is available
3. **Memory issues**: Increase container memory limits
4. **Environment variables**: Verify all required env vars are set

### Logs
```bash
# Vercel
vercel logs

# Docker
docker logs productivity-app

# Railway
railway logs
```

## Security Considerations

1. Use HTTPS in production
2. Set secure environment variables
3. Enable CORS if needed
4. Implement rate limiting
5. Regular security updates 