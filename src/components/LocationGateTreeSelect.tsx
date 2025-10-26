import React, { useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { useInput } from "react-admin";
import { HandlersLocationDTO } from "../api/data-contracts";

interface LocationGateTreeSelectProps {
  source: string;
  label?: string;
  availableLocations: HandlersLocationDTO[];
  cardDataLocations?: HandlersLocationDTO[];
}

/**
 * Custom RichTreeView input component for React Admin forms
 * Allows selecting individual gates or entire locations (which selects all gates in it)
 * Integrates with react-admin forms using useInput hook
 *
 * @param source - React Admin form field source name
 * @param label - Display label for the component
 * @param availableLocations - All available locations to choose from
 * @param cardDataLocations - Already assigned locations (for edit mode)
 */
export const LocationGateTreeSelect: React.FC<LocationGateTreeSelectProps> = ({
  source,
  label = "Select Gates",
  availableLocations,
  cardDataLocations = [],
}) => {
  const { field, fieldState, formState } = useInput({ source });

  // Transform locations data into TreeViewBaseItem format (string labels only)
  const treeItems: TreeViewBaseItem[] = useMemo(() => {
    return availableLocations.map((location) => ({
      id: `loc-${location.id}`,
      label: location.address
        ? `${location.title} (${location.address})`
        : location.title!,
      children:
        location.gates && location.gates.length > 0
          ? location.gates.map((gate) => ({
              id: String(gate.id),
              label: gate.title || `Gate ${gate.id}`,
            }))
          : [
              {
                id: `no-gates-${location.id}`,
                label: "No gates available",
              },
            ],
    }));
  }, [availableLocations]);

  const handleSelectedItemsChange = (
    _event: React.SyntheticEvent | null,
    itemIds: string[],
  ) => {
    // If a location is selected, add all its gates to the selection
    const expandedGateIds = itemIds.flatMap((id) => {
      // If it's a location ID (starts with 'loc-')
      if (id.startsWith("loc-")) {
        // Find the corresponding location
        const locationIndex = availableLocations.findIndex(
          (loc) => `loc-${loc.id}` === id,
        );
        if (locationIndex !== -1) {
          // Get all gate IDs from this location
          const location = availableLocations[locationIndex];
          return location.gates?.map((gate) => String(gate.id!)) || [];
        }
      }
      // If it's a gate ID, keep it as is
      return id;
    });

    // Filter to keep only numeric gate IDs (exclude location IDs and "no-gates" IDs)
    const gateIds = expandedGateIds
      .filter((id) => !id.startsWith("loc-") && !id.startsWith("no-gates-"))
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));

    // Update the form field value
    field.onChange(gateIds);
  };

  // Get current selected gate IDs from form state
  const selectedGateIds = (field.value as number[]) || [];

  // Initialize form field with already assigned gates from cardDataLocations
  useEffect(() => {
    // If form field is empty and we have cardDataLocations, extract gate IDs
    if (
      (!field.value || (Array.isArray(field.value) && field.value.length === 0)) &&
      cardDataLocations.length > 0
    ) {
      const assignedGateIds = cardDataLocations.flatMap(
        (location) => location.gates?.map((gate) => gate.id!) || [],
      );
      if (assignedGateIds.length > 0) {
        field.onChange(assignedGateIds);
      }
    }
  }, [cardDataLocations, field]);

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, fontWeight: 500, display: "flex", alignItems: "center" }}
      >
        {label}
      </Typography>
      <Box
        className={`w-full min-h-80 max-h-[400px] overflow-y-scroll rounded border-2 p-4 ${
          fieldState.error
            ? "border-red-500 bg-red-50 opacity-70"
            : "border-gray-300 bg-transparent opacity-100"
        } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
      >
        <RichTreeView
          items={treeItems}
          selectedItems={selectedGateIds.map(String)}
          onSelectedItemsChange={handleSelectedItemsChange}
          checkboxSelection
          multiSelect
          sx={{
            "& .MuiTreeItem-root": {
              marginBottom: "4px",
            },
          }}
        />
      </Box>
      {fieldState.error && (
        <Typography
          variant="caption"
          sx={{ color: "error.main", display: "block", mt: 1 }}
        >
          {fieldState.error.message}
        </Typography>
      )}
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", mt: 1 }}
      >
        Check location to select all gates in it
      </Typography>
    </Box>
  );
};
