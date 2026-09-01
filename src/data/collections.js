import libraryImage from '../assets/imagery/estate-library.jpg'
import gardenImage from '../assets/imagery/estate-garden.jpg'
import clubImage from '../assets/imagery/estate-club.jpg'
import lookbookImage from '../assets/imagery/lookbook-arch.jpg'
import finalEstateImage from '../assets/imagery/final-estate.jpg'

export const estateRooms = [
  {
    number: '01',
    name: 'The Library',
    title: 'THE LIBRARY',
    copy: 'Tailoring for rooms where conversation matters.',
    garment: 'Charcoal tweed blazer',
    image: libraryImage,
  },
  {
    number: '02',
    name: 'The Garden',
    title: 'THE GARDEN',
    copy: 'Weatherproof layers, considered in every line.',
    garment: 'Avelines trench in racing green',
    image: gardenImage,
  },
  {
    number: '03',
    name: 'The Club Room',
    title: 'AFTER SIX',
    copy: 'Evening clothes with nothing left to declare.',
    garment: 'Midnight dinner jacket',
    image: clubImage,
  },
]

export const collectionIndex = [
  { number: '01', name: 'The Country House', image: finalEstateImage },
  { number: '02', name: 'The City', image: libraryImage },
  { number: '03', name: 'The Club', image: clubImage },
  { number: '04', name: 'The Weekend', image: gardenImage },
  { number: '05', name: 'Evening', image: lookbookImage },
]

export const dressCodes = [
  { name: 'Morning', note: 'Soft tailoring with an unhurried line.', image: lookbookImage },
  { name: 'Country', note: 'Layers shaped by weather and place.', image: gardenImage },
  { name: 'Business', note: 'Structure without severity.', image: libraryImage },
  { name: 'Club', note: 'Clothes that settle into the room.', image: clubImage },
  { name: 'Dinner', note: 'Black, considered after six.', image: clubImage },
  { name: 'Weekend', note: 'Ease held to the same standard.', image: finalEstateImage },
]

export const wardrobeOptions = {
  CITY: {
    Classic: ['Navy Wool Coat', 'Oxford Shirt', 'Pleated Wool Trouser'],
    Relaxed: ['Cashmere Polo', 'Field Jacket', 'Pleated Wool Trouser'],
    Formal: ['Alderwyck Blazer', 'Oxford Shirt', 'Pleated Wool Trouser'],
    Understated: ['Charcoal Knit', 'Navy Wool Coat', 'Suede Loafer'],
  },
  COUNTRY: {
    Classic: ['Cashmere Polo', 'Field Jacket', 'Pleated Wool Trouser'],
    Relaxed: ['Merino Knit', 'Field Jacket', 'Suede Loafer'],
    Formal: ['Tweed Blazer', 'Oxford Shirt', 'Pleated Wool Trouser'],
    Understated: ['Forest Trench', 'Oatmeal Knit', 'Wool Trouser'],
  },
  EVENING: {
    Classic: ['Dinner Jacket', 'Evening Shirt', 'Patent Loafer'],
    Relaxed: ['Midnight Knit', 'Wool Trouser', 'Suede Loafer'],
    Formal: ['Dinner Jacket', 'Pleated Trouser', 'Silk Bow Tie'],
    Understated: ['Black Rollneck', 'Charcoal Blazer', 'Wool Trouser'],
  },
  WEEKEND: {
    Classic: ['Cashmere Polo', 'Navy Coat', 'Suede Loafer'],
    Relaxed: ['Merino Knit', 'Field Jacket', 'Wool Trouser'],
    Formal: ['Soft Blazer', 'Oxford Shirt', 'Pleated Trouser'],
    Understated: ['Oatmeal Knit', 'Forest Jacket', 'Suede Loafer'],
  },
}
