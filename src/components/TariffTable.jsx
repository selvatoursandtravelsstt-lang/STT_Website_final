import { useState } from 'react'
import WhatsAppEnquiryButton from './WhatsAppEnquiryButton.jsx'
import { createVehicleSummary } from '../utils/booking.js'

const placeholderVehicleImages = {
  sedan: '/images/cars/sedan-placeholder.svg',
  suv: '/images/cars/suv-placeholder.svg',
  traveller: '/images/cars/traveller-placeholder.svg',
}

function vehicleImageFor(vehicle) {
  const category = `${vehicle.category || ''} ${vehicle.type || ''}`.toLowerCase()
  const image = category.includes('traveller') || category.includes('mini van') || category.includes('coach')
    ? placeholderVehicleImages.traveller
    : category.includes('suv')
      ? placeholderVehicleImages.suv
      : placeholderVehicleImages.sedan
  return {
    src: vehicle.image || image,
    alt: vehicle.imageAlt || `${vehicle.type} vehicle placeholder`,
  }
}

function displayValue(value, key) {
  if (value === null || value === undefined || value === '') {
    return 'Contact for Rates'
  }
  if (typeof value === 'number') {
    if (['includedHours', 'freeKms', 'freeKmPerDay', 'minimumKmPerDay'].includes(key)) {
      return key === 'includedHours' ? `${value} hours` : `${value} km`
    }
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
    if (key === 'ratePerKm' || key === 'extraKilometreCharge') return `${formatted}/km`
    if (key === 'extraHourCharge') return `${formatted}/hour`
    return formatted
  }
  return value
}

function enquiryDetailsFor(vehicle, columns) {
  return columns
    .filter(([key]) => !['baseFare', 'totalAmount'].includes(key))
    .map(([key, label]) => [label, displayValue(vehicle[key], key)])
}

function VehicleImageCell({ tariff, vehicle }) {
  const image = vehicleImageFor(vehicle)
  return (
    <td data-label="Vehicle Image">
      <img className="tariff-vehicle-image" src={image.src} alt={image.alt} loading="lazy" />
    </td>
  )
}

function TariffColumnWidths({ columnCount }) {
  const widths = columnCount === 9
    ? ['7%', '14%', '13%', '10%', '11%', '12%', '11%', '11%', '11%']
    : Array.from({ length: columnCount }, (_, index) => `${100 / columnCount}%`)

  return (
    <colgroup>
      {widths.map((width, index) => <col key={`${index}-${width}`} style={{ width }} />)}
    </colgroup>
  )
}

function PackageTable({ tariff, packageGroup }) {
  return (
    <section className="tariff-package-group" aria-labelledby={`${packageGroup.id}-title`}>
      <div className="tariff-package-heading">
        <h3 id={`${packageGroup.id}-title`}>{packageGroup.name}</h3>
      </div>
      <div className="tariff-table-scroll" role="region" aria-label={`${packageGroup.name} vehicle tariff table`} tabIndex="0">
        <table className={`tariff-data-table${tariff.showVehicleImages === false ? ' tariff-data-table-no-images' : ''}`}>
          <TariffColumnWidths columnCount={9} />
          <thead>
            <tr>
              <th scope="col">Vehicle Image</th>
              <th scope="col">Vehicle</th>
              <th scope="col">Category / Seating</th>
              {tariff.columns.map(([, label]) => <th scope="col" key={label}>{label}</th>)}
              <th scope="col">Enquiry</th>
            </tr>
          </thead>
          <tbody>
            {packageGroup.vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <VehicleImageCell tariff={tariff} vehicle={vehicle} />
                <th scope="row" data-label="Vehicle">{vehicle.type}</th>
                <td data-label="Category / Seating">{vehicle.category}</td>
                {tariff.columns.map(([key, label]) => <td data-label={label} key={key}>{displayValue(vehicle[key], key)}</td>)}
                <td data-label="Enquiry">
                  <WhatsAppEnquiryButton
                    category={tariff.title}
                    vehicle={vehicle.type}
                    packageGroup={packageGroup.name}
                    packageAmount={vehicle.packageFare}
                    rateDetails={enquiryDetailsFor(vehicle, tariff.columns)}
                    booking={{
                      title: tariff.title,
                      serviceType: tariff.enquiryType,
                      tariffTitle: tariff.title,
                      tariffPackage: packageGroup.name,
                      package: { title: tariff.tableHeading || tariff.title, duration: `${packageGroup.hours} hours` },
                      vehicle: createVehicleSummary(vehicle, vehicleImageFor(vehicle).src, vehicleImageFor(vehicle).alt),
                      amount: vehicle.packageFare,
                      amountLabel: 'Package fare',
                      priceDetails: tariff.columns.map(([key, label]) => ({ label, value: displayValue(vehicle[key], key) })),
                      returnPath: tariff.path,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TariffTable({ tariff }) {
  const [selectedPackageId, setSelectedPackageId] = useState(
    tariff.packages?.find(({ hours }) => hours === 10)?.id || tariff.packages?.[0]?.id || '',
  )
  const selectedPackage = tariff.packages?.find(({ id }) => id === selectedPackageId)

  return (
    <section className="tariff-data-section" aria-labelledby="tariff-table-title">
      <div className="tariff-content-heading">
        <p className="eyebrow">VEHICLE TARIFF OPTIONS</p>
        <h2 id="tariff-table-title">{tariff.tableHeading || 'Explore vehicle options'}</h2>
      </div>
      {tariff.approvalNotice && <p className="tariff-approval-notice" role="note">{tariff.approvalNotice}</p>}
      {tariff.packages
        ? (
          <>
            <div className="tariff-package-tabs" role="group" aria-label="Local duty package duration">
              {tariff.packages.map((packageGroup) => (
                <button
                  aria-controls={`${packageGroup.id}-panel`}
                  aria-pressed={selectedPackageId === packageGroup.id}
                  className={`tariff-package-tab${selectedPackageId === packageGroup.id ? ' active' : ''}`}
                  id={`${packageGroup.id}-tab`}
                  key={packageGroup.id}
                  onClick={() => setSelectedPackageId(packageGroup.id)}
                  type="button"
                >
                  {packageGroup.hours} Hours
                </button>
              ))}
            </div>
            {selectedPackage && (
              <div aria-labelledby={`${selectedPackage.id}-tab`} id={`${selectedPackage.id}-panel`}>
                <p className="tariff-package-inclusions">Includes {selectedPackage.includedHours} hours and {selectedPackage.freeKms} kilometres per package.</p>
                <PackageTable tariff={tariff} packageGroup={selectedPackage} />
              </div>
            )}
          </>
        )
        : (
          <>
            <div className="tariff-table-scroll" role="region" aria-label={`${tariff.title} vehicle tariff table`} tabIndex="0">
              <table className={`tariff-data-table${tariff.showVehicleImages === false ? ' tariff-data-table-no-images' : ''}`}>
                <TariffColumnWidths columnCount={4 + tariff.columns.length} />
                <thead>
                  <tr>
                    <th scope="col">Vehicle Image</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Category / Seating</th>
                    {tariff.columns.map(([, label]) => <th scope="col" key={label}>{label}</th>)}
                    <th scope="col">Enquiry</th>
                  </tr>
                </thead>
                <tbody>
                  {tariff.vehicles.map((vehicle) => (
                    <tr key={vehicle.id || vehicle.type}>
                      <VehicleImageCell tariff={tariff} vehicle={vehicle} />
                      <th scope="row" data-label="Vehicle">{vehicle.type}</th>
                      <td data-label="Category / Seating">{vehicle.category}</td>
                      {tariff.columns.map(([key, label]) => <td data-label={label} key={key}>{displayValue(vehicle[key], key)}</td>)}
                      <td data-label="Enquiry">
                        <WhatsAppEnquiryButton
                          category={tariff.title}
                          vehicle={vehicle.type}
                          packageAmount={vehicle.packageAmount ?? vehicle.totalAmount ?? vehicle.baseFare}
                          rateDetails={enquiryDetailsFor(vehicle, tariff.columns)}
                          booking={{
                            title: tariff.title,
                            serviceType: tariff.enquiryType,
                            tariffTitle: tariff.title,
                            package: { title: tariff.tableHeading || tariff.title },
                            vehicle: createVehicleSummary(vehicle, vehicleImageFor(vehicle).src, vehicleImageFor(vehicle).alt),
                            amount: vehicle.packageAmount ?? vehicle.totalAmount ?? vehicle.baseFare,
                            amountLabel: 'Reference package amount',
                            priceDetails: tariff.columns.map(([key, label]) => ({ label, value: displayValue(vehicle[key], key) })),
                            returnPath: tariff.path,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
    </section>
  )
}

export default TariffTable
