// Portal URLs Configuration
// These URLs drive the landing page buttons

export const portalUrls = {
  owner: {
    url: 'https://runprogramowner.gofastcrushgoals.com',
    label: 'Program Owner',
    description: 'Head Coach & Admin Portal',
    icon: 'owner',
    meta: true // This is the main portal
  },
  coach: {
    url: 'https://runprogramcoach.gofastcrushgoals.com',
    label: 'Coach Portal',
    description: 'Site-level operations',
    icon: 'coach',
    meta: false
  },
  parent: {
    url: 'https://runprogramparent.gofastcrushgoals.com',
    label: 'Parent Portal',
    description: 'Registration & progress tracking',
    icon: 'parent',
    meta: false
  },
  checkout: {
    url: 'https://runprogramcheckout.gofastcrushgoals.com',
    label: 'Checkout',
    description: 'Registration & payment',
    icon: 'checkout',
    meta: false
  }
};

// Helper to get all portals
export const getAllPortals = () => Object.values(portalUrls);

// Helper to get only active portals (with URLs)
export const getActivePortals = () => Object.values(portalUrls).filter(p => p.url);

