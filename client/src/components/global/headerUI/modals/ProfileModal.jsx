import { useState, useEffect } from 'react'
import { User, Phone, Camera, Edit, Mail, MapPin, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import Modal from './Modal';

function ProfileModal({ isOpen, onClose, userData, onUpdate, styles }) {
  const { updateUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Prepare data for backend
      const updateData = {
        fullname: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      // Call backend API to update profile
      const response = await authService.updateProfile(updateData);
      
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        
        // Update local state
        onUpdate(formData);
        
        // Update auth context
        await updateUser();
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const profileStyles = styles.profileModal;

  if (!userData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Profile" size="md" styles={styles}>
      <div className={profileStyles.container}>
        {/* Avatar Section */}
        <div className={profileStyles.avatarContainer}>
          <div className={profileStyles.avatarWrapper}>
            <div className={profileStyles.avatar}>
              {formData.avatar ? (
                <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
              ) : (
                formData.name?.charAt(0).toUpperCase()
              )}
            </div>
            {isEditing && (
              <button 
                className={profileStyles.isEdit}
                onClick={() => toast.info('Image upload coming soon!')}
              >
                <Camera className={profileStyles.isEditIcon} />
              </button>
            )}
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className={profileStyles.isNotEdit}
            >
              <Edit className={profileStyles.isNotEditIcon} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className={profileStyles.formContainer}>
          <div>
            <label className={profileStyles.label}>Full Name</label>
            <div className={profileStyles.inputContainer}>
              <User className={profileStyles.inputIcon} />
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className={`${profileStyles.input} ${
                  isEditing 
                    ? 'border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200' 
                    : 'border-gray-200 bg-gray-50'
                } outline-none`}
              />
            </div>
          </div>

          <div>
            <label className={profileStyles.label}>Email Address</label>
            <div className={profileStyles.inputContainer}>
              <Mail className={profileStyles.inputIcon} />
              <input
                type="email"
                value={formData.email || ''}
                disabled={true}
                className={`${profileStyles.input} border-gray-200 bg-gray-50 cursor-not-allowed outline-none`}
                title="Email cannot be changed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className={profileStyles.label}>Phone Number</label>
            <div className={profileStyles.inputContainer}>
              <Phone className={profileStyles.inputIcon} />
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter phone number"
                className={`${profileStyles.input} ${
                  isEditing 
                    ? 'border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200' 
                    : 'border-gray-200 bg-gray-50'
                } outline-none`}
              />
            </div>
          </div>

          <div>
            <label className={profileStyles.label}>Delivery Address</label>
            <div className={profileStyles.inputContainer}>
              <MapPin className={profileStyles.inputIcon} />
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
                placeholder="Enter delivery address"
                className={`${profileStyles.input} ${
                  isEditing 
                    ? 'border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200' 
                    : 'border-gray-200 bg-gray-50'
                } outline-none`}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className={profileStyles.isEditBtnContainer}>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`${profileStyles.isSaveBtn} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className={profileStyles.isSaveBtnIcon} />
                  Save Changes
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className={`${profileStyles.isConcelBtn} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ProfileModal