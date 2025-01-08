import { TripStats } from "ojp-sdk/lib/types/trip-stats";
import { TripView } from "../functions/ojp";

export const mockTrips: TripView[] = [
  {
    "stats": {
      "duration": {
        "hours": 0,
        "minutes": 19,
        "totalMinutes": 19
      },
      "distanceMeters": 0,
      "distanceSource": "legs-sum",
      "transferNo": 0,
      "startDatetime": new Date("2025-01-08T15:05:42.000Z"),
      "endDatetime": new Date("2025-01-08T15:25:00.000Z"),
      "isCancelled": null,
      "isInfeasable": null,
      "isUnplanned": null
    } as TripStats,
    "from": {
      "from": {
        "name": "Thun",
        "platform": {
          "plannedPlatform": "3",
          "actualPlatform": "3"
        }
      },
      "to": {
        "name": "Bern",
        "platform": {
          "plannedPlatform": "4",
          "actualPlatform": "4"
        }
      },
      "lineNumber": "IC6"
    },
    "to": {
      "from": {
        "name": "Thun",
        "platform": {
          "plannedPlatform": "3",
          "actualPlatform": "3"
        }
      },
      "to": {
        "name": "Bern",
        "platform": {
          "plannedPlatform": "4",
          "actualPlatform": "4"
        }
      },
      "lineNumber": "IC6"
    }
  },
  {
    "stats": {
      "duration": {
        "hours": 0,
        "minutes": 40,
        "totalMinutes": 40
      },
      "distanceMeters": 0,
      "distanceSource": "legs-sum",
      "transferNo": 0,
      "startDatetime": new Date("2025-01-08T15:08:00.000Z"),
      "endDatetime": new Date("2025-01-08T15:48:00.000Z"),
      "isCancelled": null,
      "isInfeasable": null,
      "isUnplanned": null
    } as TripStats,
    "from": {
      "from": {
        "name": "Thun",
        "platform": {
          "plannedPlatform": "5",
          "actualPlatform": null
        }
      },
      "to": {
        "name": "Bern",
        "platform": {
          "plannedPlatform": "12",
          "actualPlatform": null
        }
      },
      "lineNumber": "S44"
    },
    "to": {
      "from": {
        "name": "Thun",
        "platform": {
          "plannedPlatform": "5",
          "actualPlatform": null
        }
      },
      "to": {
        "name": "Bern",
        "platform": {
          "plannedPlatform": "12",
          "actualPlatform": null
        }
      },
      "lineNumber": "S44"
    }
  },
  {
    "stats": {
      "duration": {
        "hours": 0,
        "minutes": 31,
        "totalMinutes": 31
      },
      "distanceMeters": 0,
      "distanceSource": "legs-sum",
      "transferNo": 0,
      "startDatetime": new Date("2025-01-08T15:12:00.000Z"),
      "endDatetime": new Date("2025-01-08T15:43:00.000Z"),
      "isCancelled": null,
      "isInfeasable": null,
      "isUnplanned": null
    } as TripStats,
    "from": {
      "from": {
        "name": "Thun",
        "platform": {
          "plannedPlatform": "4",
          "actualPlatform": null
        }
      },
      "to": {
        "name": "Bern",
        "platform": {
          "plannedPlatform": "1E-H",
          "actualPlatform": null
        }
      },
      "lineNumber": "S1"
    },
    "to": {
      "from": {
        "name": "Thun",
        "platform": {
          "plannedPlatform": "4",
          "actualPlatform": null
        }
      },
      "to": {
        "name": "Bern",
        "platform": {
          "plannedPlatform": "1E-H",
          "actualPlatform": null
        }
      },
      "lineNumber": "S1"
    }
  },
]