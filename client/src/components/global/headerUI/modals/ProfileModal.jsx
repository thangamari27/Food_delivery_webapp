import { useState, useEffect } from 'react'
import { User, Phone, Camera, Edit, Mail, MapPin, Save } from 'lucide-react';
import Modal from './Modal';

function ProfileModal({ isOpen, onClose, userData, onUpdate, styles }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const profileStyles = styles.profileModal;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Profile" size="md" styles={styles}>
      <div className={profileStyles.container}>
        {/* Avatar Section */}
        <div className={profileStyles.avatarContainer}>
          <div className={profileStyles.avatarWrapper}>
            <div className={profileStyles.avatar}>
              {formData.avatar || formData.name.charAt(0).toUpperCase()}
            </div>
            {isEditing && (
              <button className={profileStyles.isEdit}>
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
                value={formData.name}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            <label className={profileStyles.label}>Phone Number</label>
            <div className={profileStyles.inputContainer}>
              <Phone className={profileStyles.inputIcon} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            <label className={profileStyles.label}>Delivery Address</label>
            <div className={profileStyles.inputContainer}>
              <MapPin className={profileStyles.inputIcon} />
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
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
              className={profileStyles.isSaveBtn}
            >
              <Save className={profileStyles.isSaveBtnIcon} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className={profileStyles.isConcelBtn}
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