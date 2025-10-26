import {
  HandlersLocationDTO,
  HandlersLocationAssignmentRequest,
} from "../api/data-contracts";

/**
 * Converts a flat array of selected gate IDs into location assignment format
 * Groups gates by their parent location
 * @param gateIds - Array of selected gate IDs (e.g., [5, 8, 12, 15])
 * @param locations - Array of available locations with nested gates
 * @returns Array of location assignments with grouped gates
 */
export function groupGatesByLocation(
  gateIds: number[],
  locations: HandlersLocationDTO[],
): HandlersLocationAssignmentRequest[] {
  const locationMap = new Map<number, number[]>();

  // For each selected gate, find its parent location
  gateIds.forEach((gateId) => {
    const location = locations.find((loc) =>
      loc.gates?.some((gate) => gate.id === gateId),
    );

    if (location && location.id) {
      if (!locationMap.has(location.id)) {
        locationMap.set(location.id, []);
      }
      locationMap.get(location.id)!.push(gateId);
    }
  });

  // Convert map to array of location assignments
  return Array.from(locationMap.entries()).map(([locationId, gates]) => ({
    locationId,
    gateIds: gates,
  }));
}

/**
 * Extracts selected gate IDs from user's location assignments
 * Flattens the nested structure for tree view selection
 * @param locations - User's assigned locations with nested gates
 * @returns Flat array of gate IDs
 */
export function extractSelectedGates(
  locations: HandlersLocationDTO[],
): number[] {
  return locations.flatMap(
    (location) =>
      location.gates?.map((gate) => gate.id).filter((id) => id !== undefined) ||
      [],
  );
}

/**
 * Validates that all selected gates exist in available locations
 * @param selectedGateIds - Gate IDs to validate
 * @param availableLocations - Available locations to validate against
 * @returns true if all gates are valid
 */
export function validateGateSelection(
  selectedGateIds: number[],
  availableLocations: HandlersLocationDTO[],
): boolean {
  const allValidGates = new Set<number>();

  availableLocations.forEach((location) => {
    location.gates?.forEach((gate) => {
      if (gate.id) {
        allValidGates.add(gate.id);
      }
    });
  });

  return selectedGateIds.every((gateId) => allValidGates.has(gateId));
}
