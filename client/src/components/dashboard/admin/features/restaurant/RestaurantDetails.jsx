import React from 'react';
import { Star, Phone, Mail, MapPin, Clock, IndianRupee, Package, Award, Zap, Navigation, Users, CheckCircle, XCircle, Tag, Globe } from 'lucide-react';
import { getStatusColor } from '../../../../../utils/handler/admin/restaurantFilterHandler';

const DetailSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={20} className="text-orange-500" />}
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoRow = ({ icon: Icon, label, value, iconColor = "text-gray-400" }) => (
  <div className="flex items-start gap-3">
    {Icon && <Icon size={18} className={`${iconColor} mt-0.5 flex-shrink-0`} aria-hidden="true" />}
    <div className="flex-1">
      {label && <span className="text-sm text-gray-600">{label}: </span>}
      <span className={`${label ? 'font-medium' : ''} text-gray-700`}>{value}</span>
    </div>
  </div>
);

const TagList = ({ items, colorClass = "bg-gray-100 text-gray-700" }) => {
  if (!items || items.length === 0) return <p className="text-gray-500 text-sm">None</p>;
  
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span key={index} className={`px-3 py-1 text-sm rounded-full ${colorClass}`}>
          {item}
        </span>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={16} />}
        <span className="text-xs font-medium opacity-75">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

function RestaurantDetails({ restaurant, content }) {
  if (!restaurant) return null;

  // Helper functions to safely access backend data
  const getFullAddress = () => {
    const addr = restaurant.address || {};
    const parts = [
      addr.street,
      addr.area,
      addr.city,
      addr.state,
      addr.pincode
    ].filter(Boolean);
    return parts.join(', ') || 'N/A';
  };

  const getRating = () => {
    if (restaurant.rating && typeof restaurant.rating === 'object') {
      return {
        average: restaurant.rating.average || 0,
        count: restaurant.rating.count || 0
      };
    }
    return {
      average: restaurant.rating || 0,
      count: 0
    };
  };

  const getOperatingHours = () => {
    const hours = restaurant.operatingHours || {};
    return `${hours.openingTime || 'N/A'} - ${hours.closingTime || 'N/A'}`;
  };

  const getCuisineList = () => {
    if (!restaurant.cuisine) return [];
    if (Array.isArray(restaurant.cuisine)) return restaurant.cuisine;
    return [restaurant.cuisine];
  };

  const getImageUrl = () => {
    return restaurant.image?.url || null;
  };

  const getCoordinates = () => {
    const coords = restaurant.address?.coordinates || {};
    if (coords.latitude && coords.longitude) {
      return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
    }
    return 'Not available';
  };

  const getBooleanValue = (value) => value ? 'Yes' : 'No';

  const rating = getRating();

  return (
    <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Restaurant Image */}
      {getImageUrl() && (
        <img
          src={getImageUrl()}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      
      {/* Status and Rating */}
      <div className="flex flex-wrap items-center gap-4">
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(restaurant.status || 'Active')}`}>
          {restaurant.status || 'Active'}
        </span>
        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
          <Star className="text-yellow-400 fill-yellow-400" size={20} aria-hidden="true" />
          <span className="font-semibold text-gray-900">{rating.average.toFixed(1)}</span>
          <span className="text-gray-600 text-sm">({rating.count} reviews)</span>
        </div>
        {restaurant.isFeatured && (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
            Featured
          </span>
        )}
        {restaurant.isPremium && (
          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
            Premium
          </span>
        )}
        {restaurant.verificationStatus === 'Verified' && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            Verified ✓
          </span>
        )}
      </div>

      {/* Statistics */}
      {(restaurant.totalOrders > 0 || restaurant.totalRevenue > 0 || restaurant.viewCount > 0 || restaurant.favoriteCount > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {restaurant.totalOrders > 0 && (
            <StatCard 
              label="Total Orders" 
              value={restaurant.totalOrders.toLocaleString()} 
              icon={Package}
              color="blue"
            />
          )}
          {restaurant.totalRevenue > 0 && (
            <StatCard 
              label="Total Revenue" 
              value={`₹${restaurant.totalRevenue.toLocaleString()}`} 
              icon={IndianRupee}
              color="green"
            />
          )}
          {restaurant.averageOrderValue > 0 && (
            <StatCard 
              label="Avg Order Value" 
              value={`₹${Math.round(restaurant.averageOrderValue)}`} 
              icon={IndianRupee}
              color="orange"
            />
          )}
          {restaurant.viewCount > 0 && (
            <StatCard 
              label="Views" 
              value={restaurant.viewCount.toLocaleString()} 
              icon={Zap}
              color="purple"
            />
          )}
          {restaurant.favoriteCount > 0 && (
            <StatCard 
              label="Favorites" 
              value={restaurant.favoriteCount.toLocaleString()} 
              icon={Star}
              color="yellow"
            />
          )}
        </div>
      )}

      {/* Contact Information */}
      <DetailSection title="Contact Information" icon={Phone}>
        <div className="space-y-2 text-gray-700">
          <InfoRow icon={Phone} value={restaurant.phone} />
          {restaurant.email && (
            <InfoRow icon={Mail} value={restaurant.email} />
          )}
          <InfoRow icon={MapPin} value={getFullAddress()} />
          <InfoRow label="Contact Person" value={restaurant.contactPerson} />
          {restaurant.address?.coordinates && (
            <InfoRow 
              icon={Navigation} 
              label="Coordinates" 
              value={getCoordinates()} 
            />
          )}
        </div>
      </DetailSection>

      {/* Cuisine Types */}
      <DetailSection title="Cuisine Types" icon={Award}>
        <TagList 
          items={getCuisineList()} 
          colorClass="bg-orange-100 text-orange-700"
        />
      </DetailSection>

      {/* Operating Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailSection title="Operating Hours" icon={Clock}>
          <InfoRow icon={Clock} value={getOperatingHours()} />
          {restaurant.operatingHours?.weeklySchedule && restaurant.operatingHours.weeklySchedule.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium mb-1">Weekly Schedule:</p>
              <div className="space-y-1">
                {restaurant.operatingHours.weeklySchedule.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{schedule.day}:</span>
                    <span>
                      {schedule.isClosed ? 'Closed' : `${schedule.openingTime} - ${schedule.closingTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DetailSection>

        <DetailSection title="Verification & Status">
          <div className="space-y-2">
            <InfoRow 
              icon={CheckCircle} 
              label="Verification Status" 
              value={restaurant.verificationStatus || 'Pending'} 
            />
            <InfoRow 
              icon={restaurant.isActive ? CheckCircle : XCircle} 
              label="Active" 
              value={getBooleanValue(restaurant.isActive)} 
            />
            <InfoRow 
              icon={Users} 
              label="Menu Items" 
              value={restaurant.menuItems?.length || 0} 
            />
          </div>
        </DetailSection>
      </div>

      {/* Pricing & Delivery */}
      <DetailSection title="Pricing & Delivery" icon={IndianRupee}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <InfoRow label="Price Range" value={restaurant.priceRange || 'N/A'} />
          <InfoRow label="Price for Two" value={`₹${restaurant.priceForTwo || 0}`} />
          <InfoRow label="Delivery Time" value={restaurant.deliveryTime || 'N/A'} />
          <InfoRow 
            label="Delivery Time Range" 
            value={restaurant.deliveryTimeMin && restaurant.deliveryTimeMax ? 
              `${restaurant.deliveryTimeMin}-${restaurant.deliveryTimeMax} mins` : 'N/A'
            } 
          />
          <InfoRow 
            label="Delivery Available" 
            value={getBooleanValue(restaurant.deliveryAvailable)} 
          />
          <InfoRow 
            label="Takeaway Available" 
            value={getBooleanValue(restaurant.takeawayAvailable)} 
          />
          <InfoRow 
            label="Dine-In Available" 
            value={getBooleanValue(restaurant.dineInAvailable)} 
          />
          {restaurant.minOrderAmount > 0 && (
            <InfoRow 
              label="Min Order Amount" 
              value={`₹${restaurant.minOrderAmount}`} 
            />
          )}
          {restaurant.deliveryFee !== undefined && (
            <InfoRow 
              label="Delivery Fee" 
              value={`₹${restaurant.deliveryFee}`} 
            />
          )}
          {restaurant.deliveryRadius && (
            <InfoRow 
              label="Delivery Radius" 
              value={`${restaurant.deliveryRadius} km`} 
            />
          )}
        </div>
      </DetailSection>

      {/* Current Offers */}
      {(restaurant.offers || (restaurant.activeOffers && restaurant.activeOffers.length > 0)) && (
        <DetailSection title="Current Offers" icon={Tag}>
          {restaurant.offers && (
            <p className="text-green-600 font-medium">{restaurant.offers}</p>
          )}
          {restaurant.activeOffers && restaurant.activeOffers.length > 0 && (
            <div className="space-y-3 mt-2">
              {restaurant.activeOffers.filter(offer => offer.isActive).map((offer, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800">{offer.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                  {offer.discountPercentage && (
                    <p className="text-sm text-green-600 mt-1">
                      {offer.discountPercentage}% off {offer.maxDiscount && `(Max: ₹${offer.maxDiscount})`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </DetailSection>
      )}

      {/* Service Areas */}
      {restaurant.serviceAreas && restaurant.serviceAreas.length > 0 && (
        <DetailSection title="Service Areas" icon={Globe}>
          <TagList 
            items={restaurant.serviceAreas} 
            colorClass="bg-teal-100 text-teal-700"
          />
        </DetailSection>
      )}

      {/* Payment Methods */}
      {restaurant.paymentMethods && restaurant.paymentMethods.length > 0 && (
        <DetailSection title="Payment Methods">
          <TagList 
            items={restaurant.paymentMethods} 
            colorClass="bg-indigo-100 text-indigo-700"
          />
        </DetailSection>
      )}

      {/* Badges */}
      {restaurant.badges && restaurant.badges.length > 0 && (
        <DetailSection title="Badges" icon={Award}>
          <TagList 
            items={restaurant.badges} 
            colorClass="bg-blue-100 text-blue-700"
          />
        </DetailSection>
      )}

      {/* Features */}
      {restaurant.features && restaurant.features.length > 0 && (
        <DetailSection title="Features" icon={Zap}>
          <TagList 
            items={restaurant.features} 
            colorClass="bg-gray-100 text-gray-700"
          />
        </DetailSection>
      )}

      {/* Description */}
      {restaurant.description && (
        <DetailSection title="Description">
          <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
        </DetailSection>
      )}

      {/* Timestamps */}
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
          {restaurant.create_at && (
            <InfoRow 
              label="Created" 
              value={new Date(restaurant.create_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} 
            />
          )}
          {restaurant.update_at && (
            <InfoRow 
              label="Last Updated" 
              value={new Date(restaurant.update_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;