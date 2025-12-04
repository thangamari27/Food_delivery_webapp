import React from 'react';
import BrandSection from './fooderUI/BrandSection';
import QuickLinks from './fooderUI/QuickLinks';
import CompanyLinks from './fooderUI/CompanyLinks';
import ContactInfo from './fooderUI/ContactInfo';
import CopyRight from './fooderUI/CopyRight';
import { footerContent } from '@/utils/constant/admin/HomeConstant'

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <BrandSection brand={footerContent.brand} social={footerContent.social} />

          {/* Quick Links */}
          <QuickLinks quick={footerContent.quick} />

          {/* Company Links */}
          <CompanyLinks company={footerContent.company} />

          {/* Contact Info */}
          <ContactInfo contact={footerContent.contact}  />
        </div>

        {/* Bottom Bar */}
        <CopyRight copyright={footerContent.copyright} />
      </div>
    </footer>
  );
};

export default Footer;