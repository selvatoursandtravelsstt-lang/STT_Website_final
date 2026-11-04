import { findVehicleSpecification } from "../data/vehicleSpecifications.js";

export const bookingStorageKey = "selva-pending-booking";

export function createBookingRecord(booking) {
  const randomPart =
    globalThis.crypto?.randomUUID?.().split("-")[0] ??
    Math.random().toString(36).slice(2, 10);

  return {
    ...booking,
    reference: `STT-${Date.now().toString(36).toUpperCase()}-${randomPart.toUpperCase()}`,
    createdAt: new Date().toISOString(),
    journey: {
      pickupLocation: "",
      dropoffLocation:
        booking.package?.destination || booking.destination || "",
      pickupDate: "",
      pickupTime: "",
      travellers: "",
      ...booking.journey,
    },
  };
}

export function createVehicleSummary(vehicle, image = "", imageAlt = "") {
  const name = vehicle.name || vehicle.type || "Vehicle";
  const descriptor = `${name} ${vehicle.category || ""}`.toLowerCase();
  const seatCount = descriptor.match(/(\d+)\s*[- ]?seater/i)?.[1];
  const isNonAc = /non[\s-]*a\s*\/?\s*c/i.test(descriptor);
  const hasAc = /a\s*\/?\s*c/i.test(descriptor);
  const specification = findVehicleSpecification({ ...vehicle, name });
  const fuelType = vehicle.fuelType && vehicle.fuelType !== "Not listed"
    ? vehicle.fuelType
    : specification?.fuelType ?? (specification ? "To be confirmed" : "Not listed");
  const passengerCapacity = vehicle.passengerCapacity ?? specification?.passengerCapacity;
  const capacity = passengerCapacity === null || passengerCapacity === undefined
    ? specification
      ? "To be confirmed"
      : vehicle.seatingCapacity || (seatCount ? `${seatCount} seats` : "Not listed")
    : `${passengerCapacity} passengers`;

  return {
    name,
    model: vehicle.model || name,
    fuelType,
    features:
      vehicle.features || (isNonAc ? "Non-A/C" : hasAc ? "A/C" : "Not listed"),
    capacity,
    category: vehicle.category || "",
    image: image || vehicle.image || "",
    imageAlt: imageAlt || vehicle.imageAlt || `${name} vehicle`,
  };
}

export function readStoredBooking() {
  try {
    const storedBooking = sessionStorage.getItem(bookingStorageKey);
    return storedBooking ? JSON.parse(storedBooking) : null;
  } catch {
    return null;
  }
}

export function persistBooking(booking) {
  try {
    sessionStorage.setItem(bookingStorageKey, JSON.stringify(booking));
  } catch {
    // The router state still carries the booking if storage is unavailable.
  }
}
