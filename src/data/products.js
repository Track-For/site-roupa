import cashmerePolo from '../assets/products/cashmere-polo.jpg'
import navyCoat from '../assets/products/navy-coat.jpg'
import oxfordShirt from '../assets/products/oxford-shirt.jpg'
import pleatedTrouser from '../assets/products/pleated-trouser.jpg'
import suedeLoafer from '../assets/products/suede-loafer.jpg'
import fieldJacket from '../assets/products/field-jacket.jpg'
import materialStudy from '../assets/textures/material-study.jpg'
import marbleBlazer from '../assets/imagery/marble-blazer.jpg'

export const products = [
  {
    id: 'cashmere-polo',
    name: 'Cashmere Polo',
    collection: 'The Country House',
    price: 'R$ 2.850',
    material: 'Brushed cashmere',
    cut: 'Relaxed shoulder, clean hem',
    image: cashmerePolo,
    secondaryImage: materialStudy,
    colors: ['Oatmeal', 'Navy', 'British Racing Green'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'navy-coat',
    name: 'Double-Breasted Wool Coat',
    collection: 'The City',
    price: 'R$ 9.400',
    material: 'Heavy brushed wool',
    cut: 'Long line, full canvas',
    image: navyCoat,
    secondaryImage: marbleBlazer,
    colors: ['Navy', 'Charcoal', 'Camel'],
    sizes: ['46', '48', '50', '52', '54'],
  },
  {
    id: 'oxford-shirt',
    name: 'Oxford Shirt',
    collection: 'The City',
    price: 'R$ 1.950',
    material: 'Long-staple cotton',
    cut: 'Soft collar, straight body',
    image: oxfordShirt,
    secondaryImage: materialStudy,
    colors: ['Ivory', 'Oatmeal', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'pleated-trouser',
    name: 'Pleated Wool Trouser',
    collection: 'The Library',
    price: 'R$ 3.200',
    material: 'Twill wool',
    cut: 'High rise, single pleat',
    image: pleatedTrouser,
    secondaryImage: marbleBlazer,
    colors: ['Charcoal', 'Navy', 'Camel'],
    sizes: ['38', '40', '42', '44', '46'],
  },
  {
    id: 'suede-loafer',
    name: 'Suede Loafer',
    collection: 'The Weekend',
    price: 'R$ 4.850',
    material: 'Fine suede',
    cut: 'Hand-lasted penny loafer',
    image: suedeLoafer,
    secondaryImage: materialStudy,
    colors: ['Tobacco', 'Burgundy', 'Navy'],
    sizes: ['39', '40', '41', '42', '43', '44'],
  },
  {
    id: 'field-jacket',
    name: 'Estate Field Jacket',
    collection: 'The Garden',
    price: 'R$ 5.600',
    material: 'Brushed cotton',
    cut: 'Unlined, four-pocket',
    image: fieldJacket,
    secondaryImage: materialStudy,
    colors: ['British Racing Green', 'Camel', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

export const colorValues = {
  Navy: '#202a39',
  'British Racing Green': '#20372a',
  Camel: '#9a7353',
  Oatmeal: '#d7d0c2',
  Charcoal: '#343633',
  Burgundy: '#57272d',
  Ivory: '#eeeae1',
  Tobacco: '#795039',
}
