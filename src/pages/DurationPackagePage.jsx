import { Navigate, useParams } from 'react-router-dom'
import TourPackageLayout from '../components/TourPackageLayout.jsx'
import { multiDayPackages } from '../data/multiDayPackages.js'
import { oneDayPackages } from '../data/oneDayPackages.js'
import { tourPackageDurations } from '../data/tourPackages.js'

function DurationPackagePage() {
  const { duration: durationId } = useParams()
  const duration = tourPackageDurations.find(({ id }) => id === durationId)

  if (!duration) return <Navigate to="/not-found" replace />

  const packages = duration.id === 'one-day'
    ? oneDayPackages
    : multiDayPackages.filter((trip) => trip.durationId === duration.id)

  return <TourPackageLayout duration={duration} packages={packages} durations={tourPackageDurations} />
}

export default DurationPackagePage
