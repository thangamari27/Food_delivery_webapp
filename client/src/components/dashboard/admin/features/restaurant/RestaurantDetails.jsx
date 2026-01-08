import React from 'react';
import { Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getStatusColor } from '../../../../../utils/handler/admin/restaurantFilterHandler';

const DetailSection = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
    {children}
  </div>
);

const ContactInfo = ({ restaurant }) => (
  <div className="space-y-2 text-gray-700">
    <div className="flex items-center gap-2">
      <Phone size={18} className="text-gray-400" aria-hidden="true" />
      <span>{restaurant.phone}</span>
    </div>
    {restaurant.email && (
      <div className="flex items-center gap-2">
        <Mail size={18} className="text-gray-400" aria-hidden="true" />
        <span>{restaurant.email}</span>
      </div>
    )}
    <div className="flex items-center gap-2">
      <MapPin size={18} className="text-gray-400" aria-hidden="true" />
      <span>{restaurant.address}, {restaurant.city}</span>
    </div>
  </div>
);

const TagList = ({ items, colorClass }) => (
  <div className="flex flex-wrap gap-2">
    {items.map(item => (
      <span key={item} className={`px-3 py-1 text-sm rounded-full ${colorClass}`}>
        {item}
      </span>
    ))}
  </div>
);

function RestaurantDetails({ restaurant, content }) {
  if (!restaurant) return null;

  return (
    <div className="p-6 space-y-6">
      {restaurant.image && (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
      
      <div className="flex items-center gap-4">
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(restaurant.status)}`}>
          {restaurant.status}
        </span>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-400 fill-yellow-400" size={20} aria-hidden="true" />
          <span className="font-semibold">{restaurant.rating}</span>
        </div>
      </div>
      
      <DetailSection title={content.labels.basicInfo}>
        <ContactInfo restaurant={restaurant} />
      </DetailSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailSection title="Cuisine Types">
          <TagList 
            items={restaurant.cuisine} 
            colorClass="bg-orange-100 text-orange-700"
          />
        </DetailSection>
        
        <DetailSection title="Operating Hours">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={18} className="text-gray-400" aria-hidden="true" />
            <span>{restaurant.openingTime} - {restaurant.closingTime}</span>
          </div>
        </DetailSection>
      </div>
      
      <DetailSection title="Pricing & Delivery">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="text-sm text-gray-600">Price Range:</span>
            <p className="font-medium">{restaurant.priceRange}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Delivery Time:</span>
            <p className="font-medium">{restaurant.deliveryTime}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Delivery Available:</span>
            <p className="font-medium">{restaurant.deliveryAvailable ? 'Yes' : 'No'}</p>
          </div>
          {restaurant.offers && (
            <div>
              <span className="text-sm text-gray-600">Current Offers:</span>
              <p className="font-medium text-green-600">{restaurant.offers}</p>
            </div>
          )}
        </div>
      </DetailSection>
      
      {restaurant.badges.length > 0 && (
        <DetailSection title="Badges">
          <TagList 
            items={restaurant.badges} 
            colorClass="bg-blue-100 text-blue-700"
          />
        </DetailSection>
      )}
      
      {restaurant.features.length > 0 && (
        <DetailSection title="Features">
          <TagList 
            items={restaurant.features} 
            colorClass="bg-gray-100 text-gray-700"
          />
        </DetailSection>
      )}
      
      {restaurant.description && (
        <DetailSection title="Description">
          <p className="text-gray-700">{restaurant.description}</p>
        </DetailSection>
      )}
    </div>
  );
}

export default RestaurantDetails;