import { User, Group, Venue } from '@nightlight/src/types';

export const TEST_USERS: User[] = [
  {
    _id: '5e9f1c5b0f1c9c0b5c8b4566',
    firebaseUid: '123456789',
    imgUrlProfileSmall: 'https://i.imgur.com/X2BVSih.jpeg',
    imgUrlProfileLarge: 'https://i.imgur.com/X2BVSih.jpeg',
    imgUrlCover: 'https://i.imgur.com/X2BVSih.jpeg',
    firstName: 'Graham',
    lastName: 'Hemingway',
    email: 'probably.not@vanderbilt.edu',
    phone: '6155555554',
    birthday: new Date('1998-01-01'),
    currentGroup: '5e9f1c5b0f1c9c0b5c8b4567',
    friends: ['5e9f1c5b0f1c9c0b5c8b4567'],
    lastActive: {
      location: {
        latitude: 36.1447,
        longitude: -86.8027,
      },
      time: new Date(),
    },
    savedGroups: [],
  },
  {
    _id: '5e9f1c5b0f1c9c0b5c8b4567',
    firebaseUid: '1234567890',
    imgUrlProfileSmall:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04K9PNV6B1-915270f4cf38-512',
    imgUrlProfileLarge:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04K9PNV6B1-915270f4cf38-512',
    imgUrlCover: 'https://i.imgur.com/X2BVSih.jpeg',
    firstName: 'Ethan',
    lastName: 'Ratnofsky',
    email: 'ha.u.thought@vanderbilt.edu',
    phone: '6155555555',
    birthday: new Date('1998-01-01'),
    currentGroup: '5e9f1c5b0f1c9c0b5c8b4567',
    friends: ['5e9f1c5b0f1c9c0b5c8b4567'],
    lastActive: {
      location: {
        latitude: 36.1447,
        longitude: -86.8027,
      },
      time: new Date('2023-02-28'),
    },
    savedGroups: [
      {
        name: 'Test Group',
        members: ['5e9f1c5b0f1c9c0b5c8b4567'],
      },
    ],
  },
  {
    _id: '5e9f1c5b0f1c9c0b5c8b4568',
    firebaseUid: '1234567891',
    imgUrlProfileSmall:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04L2QUMVH7-a29f336a4279-512',
    imgUrlProfileLarge:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04L2QUMVH7-a29f336a4279-512',
    imgUrlCover: 'https://i.imgur.com/X2BVSih.jpeg',
    firstName: 'Jacob',
    lastName: 'Lurie',
    email: 'ha.u.thought2@vanderbilt.edu',
    phone: '6155555556',
    birthday: new Date('1998-01-01'),
    currentGroup: '5e9f1c5b0f1c9c0b5c8b4567',
    friends: ['5e9f1c5b0f1c9c0b5c8b4567'],
    lastActive: {
      location: {
        latitude: 36.1447,
        longitude: -86.8027,
      },
      time: new Date('2023-01-20'),
    },
    savedGroups: [
      {
        name: 'Test Group',
        members: ['5e9f1c5b0f1c9c0b5c8b4567'],
      },
    ],
  },
  {
    _id: '5e9f1c5b0f1c9c0b5c8b4569',
    firebaseUid: '1234567892',
    imgUrlProfileSmall:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04KQA281EE-4aabe4704f56-512',
    imgUrlProfileLarge:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04KQA281EE-4aabe4704f56-512',
    imgUrlCover: 'https://i.imgur.com/X2BVSih.jpeg',
    firstName: 'Sophia',
    lastName: 'Brent',
    email: 'ha.u.thought3@vanderbilt.edu',
    phone: '6155555557',
    birthday: new Date('1998-01-01'),
    currentGroup: '5e9f1c5b0f1c9c0b5c8b4567',
    friends: ['5e9f1c5b0f1c9c0b5c8b4567'],
    lastActive: {
      location: {
        latitude: 36.1447,
        longitude: -86.8027,
      },
      time: new Date('2023-01-20'),
    },
    savedGroups: [
      {
        name: 'Test Group',
        members: ['5e9f1c5b0f1c9c0b5c8b4567'],
      },
    ],
  },
  {
    _id: '5e9f1c5b0f1c9c0b5c8b4570',
    firebaseUid: '1234567893',
    imgUrlProfileSmall:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04KMBQSUSZ-619550ec5a62-512',
    imgUrlProfileLarge:
      'https://ca.slack-edge.com/T04K9KRM37Z-U04KMBQSUSZ-619550ec5a62-512',
    imgUrlCover: 'https://i.imgur.com/X2BVSih.jpeg',
    firstName: 'Zi',
    lastName: 'Teoh',
    email: 'ha.u.thought4@vanderbilt.edu',
    phone: '6155555558',
    birthday: new Date('1998-01-01'),
    currentGroup: '5e9f1c5b0f1c9c0b5c8b4567',
    friends: ['5e9f1c5b0f1c9c0b5c8b4567'],
    lastActive: {
      location: {
        latitude: 36.1447,
        longitude: -86.8027,
      },
      time: new Date('2023-01-20'),
    },
    savedGroups: [
      {
        name: 'Test Group',
        members: ['5e9f1c5b0f1c9c0b5c8b4567'],
      },
    ],
  },
];

export const TEST_GROUPS: Group[] = [];

export const TEST_VENUES: Venue[] = [
  {
    _id: '5f9f1b9b0b1b9c0017a1b1a1',
    name: 'The Bitter End',
    address: '147 Bleecker St, New York, NY 10012',
    location: {
      latitude: 40.729,
      longitude: -73.994,
    },
    reactions: {
      '🔥': {
        count: 21,
        didReact: true,
      },
      '⚠️': {
        count: 4,
        didReact: false,
      },
      '🛡️': {
        count: 54,
        didReact: true,
      },
      '💩': {
        count: 1,
        didReact: true,
      },
      '🎉': {
        count: 12,
        didReact: false,
      },
    },
  },
];
