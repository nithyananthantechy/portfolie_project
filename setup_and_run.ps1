# Set the database URL explicitly for this session
$env:DATABASE_URL="file:./dev.db"

# Generate Prisma Client
Write-Host "Generating Prisma Client..."
npx prisma generate

# Push DB schema (creates dev.db if missing)
Write-Host "Syncing Database..."
npx prisma db push

# Start the development server
Write-Host "Starting Server on http://localhost:3000 ..."
npm run dev
