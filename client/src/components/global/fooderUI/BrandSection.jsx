import React from 'react'

function BrandSection({ brand, social, }) {
  return (
    <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{brand.logo}</span>
            <h3 className="text-2xl font-bold text-gray-900">
            {brand.name}
            </h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
            {brand.address}
        </p>
        
        {/* Social Media Icons */}
        <div className="flex gap-3 mt-6">
            {social.map((s, i) => {
            const Icon = s.icon;
            return (
                <a key={i} href={s.url} aria-label={s.name}>
                <Icon size={18} />
                </a>
            );
            })}
        </div>
    </div>
  )
}

export default BrandSection