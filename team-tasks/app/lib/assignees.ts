export interface Assignee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role?: string;
  department?: string;
}

// Static list of assignees - this would eventually be fetched from the database
export const ASSIGNEES: Assignee[] = [
  {
    id: "john.doe",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John%20Doe",
    initials: "JD",
    role: "Frontend Developer",
    department: "Engineering"
  },
  {
    id: "jane.smith",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane%20Smith",
    initials: "JS",
    role: "Product Manager",
    department: "Product"
  },
  {
    id: "mike.johnson",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike%20Johnson",
    initials: "MJ",
    role: "Backend Developer",
    department: "Engineering"
  },
  {
    id: "sarah.wilson",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah%20Wilson",
    initials: "SW",
    role: "UI/UX Designer",
    department: "Design"
  },
  {
    id: "david.brown",
    name: "David Brown",
    email: "david.brown@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Brown",
    initials: "DB",
    role: "DevOps Engineer",
    department: "Engineering"
  },
  {
    id: "emily.davis",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily%20Davis",
    initials: "ED",
    role: "QA Engineer",
    department: "Engineering"
  },
  {
    id: "alex.garcia",
    name: "Alex Garcia",
    email: "alex.garcia@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex%20Garcia",
    initials: "AG",
    role: "Data Analyst",
    department: "Analytics"
  },
  {
    id: "lisa.martinez",
    name: "Lisa Martinez",
    email: "lisa.martinez@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa%20Martinez",
    initials: "LM",
    role: "Scrum Master",
    department: "Product"
  },
  {
    id: "ryan.lee",
    name: "Ryan Lee",
    email: "ryan.lee@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan%20Lee",
    initials: "RL",
    role: "Full Stack Developer",
    department: "Engineering"
  },
  {
    id: "anna.taylor",
    name: "Anna Taylor",
    email: "anna.taylor@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna%20Taylor",
    initials: "AT",
    role: "Marketing Manager",
    department: "Marketing"
  }
];

// Helper functions for working with assignees
export const getAssigneeById = (id: string): Assignee | undefined => {
  return ASSIGNEES.find(assignee => assignee.id === id);
};

export const getAssigneeByEmail = (email: string): Assignee | undefined => {
  return ASSIGNEES.find(assignee => assignee.email === email);
};

export const getAssigneesByDepartment = (department: string): Assignee[] => {
  return ASSIGNEES.filter(assignee => assignee.department === department);
};

// For backward compatibility with existing code that expects { value, label } format
export const getAssigneeOptions = () => {
  return ASSIGNEES.map(assignee => ({
    value: assignee.id,
    label: assignee.name
  }));
};

// Generate fallback avatar URL using initials (for consistent fallbacks)
export const getInitialsAvatar = (name: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
};

// Generate avatar URL using avataaars style (more detailed avatars)
export const getAvataaarsAvatar = (name: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}; 