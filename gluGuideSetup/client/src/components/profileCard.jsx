import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes, faSignOutAlt, faBlog, faUtensils, faBookOpen, faPlusCircle, faFileAlt, faUser, faCamera, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  COMMON_CLASSES, 
  UI_CONFIG, 
  COLORS, 
  ACCESSIBILITY, 
  APP_CONFIG 
} from '../constants/index.js';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [currentBio, setCurrentBio] = useState('');
  const [dpUrl, setDpUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingDp, setIsEditingDp] = useState(false);
  const [selectedDpFile, setSelectedDpFile] = useState(null);
  const [previewDp, setPreviewDp] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bioCharCount, setBioCharCount] = useState(0);
  const navigate = useNavigate();

  const maxBioLength = 500;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const [statusRes, bioRes, dpRes] = await Promise.all([
          axiosInstance.get('/status'),
          axiosInstance.get('/bio'),
          axiosInstance.get('/dp').catch(err => {
            if (err.response && err.response.status === 404) {
              return { data: { url: '' } };
            }
            throw err;
          })
        ]);

        if (statusRes.data.valid) {
          setUser(statusRes.data);
        }
        
        if (bioRes.data && bioRes.data.profile_bio) {
          const bioContent = bioRes.data.profile_bio;
          setBio(bioContent);
          setCurrentBio(bioContent);
          const textContent = bioContent.replace(/<[^>]*>/g, '');
          setBioCharCount(textContent.length);
        }
        
        if (dpRes.data && dpRes.data.url) {
          setDpUrl(dpRes.data.url);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(`Failed to load profile data: ${error.response?.data?.error || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleBioChange = (value) => {
    setCurrentBio(value);
    const textContent = value.replace(/<[^>]*>/g, '');
    setBioCharCount(textContent.length);
  };

  const handleBioEditToggle = () => {
    if (isEditingBio) {
      setCurrentBio(bio);
      setBioCharCount(bio.replace(/<[^>]*>/g, '').length);
    }
    setIsEditingBio(!isEditingBio);
    setError('');
  };

  const handleSaveBio = async () => {
    const textContent = currentBio.replace(/<[^>]*>/g, '');
    if (textContent.length > maxBioLength) {
      setError(`Bio text cannot exceed ${maxBioLength} characters.`);
      return;
    }

    try {
      const response = await axiosInstance.post('/setBio', { profile_bio: currentBio });
      if (response.status === 200) {
        setBio(currentBio);
        setIsEditingBio(false);
        setSuccessMessage('Bio updated successfully!');
        setError('');
      } else {
        setError('Failed to update bio. Server returned an error.');
      }
    } catch (error) {
      console.error('Error updating bio:', error);
      setError(`Failed to update bio: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, WebP, or GIF).');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB.');
        return;
      }

      setSelectedDpFile(file);
      setPreviewDp(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSaveDp = async () => {
    if (!selectedDpFile) {
      setError('Please select a file before saving.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('dp', selectedDpFile);

    try {
      const response = await axiosInstance.post('/setDp', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setDpUrl(response.data.url);
        setIsEditingDp(false);
        setSelectedDpFile(null);
        setPreviewDp(null);
        setSuccessMessage('Profile picture updated successfully!');
        setError('');
      } else {
        setError('Failed to update profile picture. Server returned an error.');
      }
    } catch (error) {
      console.error('Error updating DP:', error);
      setError(`Failed to update profile picture: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelDpEdit = () => {
    setIsEditingDp(false);
    setSelectedDpFile(null);
    setPreviewDp(null);
    setError('');
  };

  const handleDeleteDp = async () => {
    if (!window.confirm('Are you sure you want to delete your profile picture?')) {
      return;
    }

    setIsUploading(true);
    try {
      const response = await axiosInstance.delete('/deleteDp');
      if (response.status === 200) {
        setDpUrl('');
        setIsEditingDp(false);
        setSelectedDpFile(null);
        setPreviewDp(null);
        setSuccessMessage('Profile picture deleted successfully.');
        setError('');
      } else {
        setError('Failed to delete profile picture. Server returned an error.');
      }
    } catch (error) {
      console.error('Error deleting DP:', error);
      setError(`Error deleting display picture: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmText = "DELETE";
    const confirmation = prompt(`⚠️ WARNING: This will permanently delete your account and all associated data.\n\nTo confirm account deletion, please type "${confirmText}" in the box below. This action cannot be undone.`);
    
    if (confirmation !== confirmText) {
        alert('Account deletion cancelled or confirmation text did not match.');
        return;
    }
    
    try {
      const response = await axiosInstance.post('/deleteAccount', { confirmDelete: user });
      if (response.status === 200) {
        alert('Account deleted successfully.');
        navigate('/login');
      } else {
        setError('Failed to delete account. Server returned an error.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError(`Error deleting account: ${error.response?.data?.error || error.message}`);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };

  if (loading) {
    return (
      <section className={`${COMMON_CLASSES.CARD_BASE} p-8 animate-pulse`} aria-labelledby="loading-profile">
        <div className={`${COMMON_CLASSES.FLEX_CENTER} gap-4`} role="status" aria-live="polite">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-secondary-dark border-t-transparent" aria-hidden="true"></div>
          <div className="sr-only">Loading profile information, please wait</div>
          <p id="loading-profile" className={`${UI_CONFIG.TYPOGRAPHY.body.base} text-text-secondary font-medium`}>Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Messages */}
      {error && (
        <div className="bg-error-light border-l-4 border-error p-4 rounded-r-lg" role="alert" aria-live="assertive">
          <div className={`${COMMON_CLASSES.FLEX_START} gap-3`}>
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-error text-lg flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-error-dark font-semibold mb-1 text-sm">Error</h3>
              <p className="text-error-dark text-sm leading-relaxed">{error}</p>
            </div>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-error hover:text-error-dark focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 rounded p-1 min-w-[44px] min-h-[44px] transition-colors duration-200"
              aria-label="Dismiss error message"
              type="button"
            >
              <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-success-light border-l-4 border-success p-4 rounded-r-lg" role="alert" aria-live="polite">
          <div className={`${COMMON_CLASSES.FLEX_BETWEEN} items-start`}>
            <div className={`${COMMON_CLASSES.FLEX_START} gap-3`}>
              <div className="text-success mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-success-dark font-semibold mb-1 text-sm">Success</h3>
                <p className="text-success-dark text-sm leading-relaxed">{successMessage}</p>
              </div>
            </div>
            <button 
              onClick={() => setSuccessMessage('')}
              className="text-success hover:text-success-dark focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 rounded p-1 min-w-[44px] min-h-[44px] transition-colors duration-200"
              aria-label="Dismiss success message"
              type="button"
            >
              <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions Card */}
        <article className={`${COMMON_CLASSES.CARD_BASE} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-info-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-info-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 id="quick-nav-heading" className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-0`}>
              Quick Navigation
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3" role="navigation" aria-labelledby="quick-nav-heading">
            {/* My Blogs Navigation */}
            <button
              onClick={() => navigate('/myBlogs')}
              className="group flex flex-col items-center p-4 text-center bg-gradient-to-br from-secondary-light to-secondary-medium hover:from-secondary-medium hover:to-secondary-dark border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[100px] transform hover:scale-105 active:scale-95"
              type="button"
            >
              <div className="w-8 h-8 bg-secondary-medium group-hover:bg-secondary rounded-lg flex items-center justify-center mb-2 transition-colors duration-300">
                <svg className="w-4 h-4 text-secondary-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-darker text-sm mb-1">My Blogs</h3>
              <p className="text-xs text-secondary-dark group-hover:text-secondary-darker">Write & manage</p>
            </button>

            {/* Log Meal Navigation */}
            <button
              onClick={() => navigate('/logMeal')}
              className="group flex flex-col items-center p-4 text-center bg-gradient-to-br from-secondary-light to-secondary-medium hover:from-secondary-medium hover:to-secondary-dark border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[100px] transform hover:scale-105 active:scale-95"
              type="button"
            >
              <div className="w-8 h-8 bg-secondary-medium group-hover:bg-secondary rounded-lg flex items-center justify-center mb-2 transition-colors duration-300">
                <svg className="w-4 h-4 text-secondary-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-darker text-sm mb-1">Log Meal</h3>
              <p className="text-xs text-secondary-dark group-hover:text-secondary-darker">Track nutrition</p>
            </button>

            {/* Meals Overview Navigation */}
            <button
              onClick={() => navigate('/mealsOverview')}
              className="group flex flex-col items-center p-4 text-center bg-gradient-to-br from-secondary-light to-secondary-medium hover:from-secondary-medium hover:to-secondary-dark border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[100px] transform hover:scale-105 active:scale-95"
              type="button"
            >
              <div className="w-8 h-8 bg-secondary-medium group-hover:bg-secondary rounded-lg flex items-center justify-center mb-2 transition-colors duration-300">
                <svg className="w-4 h-4 text-secondary-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-darker text-sm mb-1">Overview</h3>
              <p className="text-xs text-secondary-dark group-hover:text-secondary-darker">Review history</p>
            </button>

            {/* Recipes Navigation */}
            <button
              onClick={() => navigate('/Recipes')}
              className="group flex flex-col items-center p-4 text-center bg-gradient-to-br from-secondary-light to-secondary-medium hover:from-secondary-medium hover:to-secondary-dark border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[100px] transform hover:scale-105 active:scale-95"
              type="button"
            >
              <div className="w-8 h-8 bg-secondary-medium group-hover:bg-secondary rounded-lg flex items-center justify-center mb-2 transition-colors duration-300">
                <svg className="w-4 h-4 text-secondary-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-darker text-sm mb-1">Recipes</h3>
              <p className="text-xs text-secondary-dark group-hover:text-secondary-darker">Discover meals</p>
            </button>
          </div>
        </article>

        {/* Profile & About Me Combined Card */}
        <article className={`${COMMON_CLASSES.CARD_BASE} p-6`} aria-labelledby="profile-bio-heading">
          {/* Profile Header with Picture and Name */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative flex-shrink-0">
              <img
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg bg-background-secondary transition-transform duration-300 hover:scale-105"
                src={previewDp || dpUrl || 'https://via.placeholder.com/96/898AC4/ffffff?text=👤'}
                alt={`${user || 'User'}'s profile picture`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/96/898AC4/ffffff?text=👤';
                }}
                role="img"
                loading="lazy"
              />
              
              {!isEditingDp && (
                <button 
                  onClick={() => setIsEditingDp(true)}
                  className="absolute bottom-0 right-0 bg-secondary-dark hover:bg-secondary-darker text-white rounded-full w-6 h-6 p-0 min-w-[24px] min-h-[24px] shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  aria-label="Edit profile picture"
                  type="button"
                >
                  <FontAwesomeIcon icon={faCamera} className="text-xs" aria-hidden="true" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-1`}>
                    {user?.username || 'Username'}
                  </h1>
                  <p className={`${UI_CONFIG.TYPOGRAPHY.body.small} text-text-secondary`}>
                    {APP_CONFIG.NAME} Member
                  </p>
                </div>
                
                {!isEditingBio && (
                  <button 
                    onClick={handleBioEditToggle}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-w-[44px] min-h-[44px]"
                    aria-label="Edit bio section"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-sm" aria-hidden="true" />
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* About Me Bio Section */}
          <div className="mt-6">
            {isEditingBio ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="profile-bio-heading" className={`${UI_CONFIG.TYPOGRAPHY.headings.h4} text-text-primary mb-0`}>
                    About Me
                  </h2>
                </div>
                <fieldset>
                <legend className="sr-only">Edit your bio</legend>
                <div className="border border-border-light rounded-lg overflow-hidden">
                  <ReactQuill 
                    value={currentBio} 
                    onChange={handleBioChange}
                    modules={quillModules}
                    className="bg-white"
                    placeholder="Tell us about yourself..."
                    aria-label="Bio editor"
                  />
                </div>
              </fieldset>
              
              <div className="flex items-center justify-between">
                <p className={`text-sm ${bioCharCount > maxBioLength ? 'text-error' : 'text-text-tertiary'}`}>
                  {bioCharCount}/{maxBioLength} characters
                </p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handleSaveBio}
                    className="px-4 py-2 bg-success hover:bg-success-dark text-white text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
                    type="button"
                  >
                    Save Bio
                  </button>
                  <button 
                    onClick={handleBioEditToggle}
                    className="px-4 py-2 bg-text-secondary hover:bg-text-primary text-white text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-text-secondary focus:ring-offset-2"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h4} text-text-primary mb-0`}>
                    About Me
                  </h2>
                  <button 
                    onClick={handleBioEditToggle}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-w-[44px] min-h-[44px]"
                    aria-label="Edit bio section"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-sm" aria-hidden="true" />
                    Edit
                  </button>
                </div>
                {bio ? (
                  <div className="bg-background-secondary border border-border-light rounded-xl p-4 shadow-sm">
                    <div id="bio-content" className="text-text-primary leading-relaxed text-sm">
                      {parse(bio)}
                    </div>
                  </div>
                ) : (
                  <div className="text-text-tertiary italic py-6 text-center border-2 border-dashed border-border-light rounded-xl bg-background-secondary hover:border-secondary transition-colors duration-200">
                    <FontAwesomeIcon icon={faFileAlt} className="text-3xl mb-3 text-secondary-medium" aria-hidden="true" />
                    <p className="font-semibold text-secondary-dark mb-1">No bio added yet</p>
                    <p className="text-sm text-secondary">Click Edit to share something about yourself</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* My Activity Section */}
          <div className="mt-8 pt-6 border-t border-border-light">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-secondary-medium rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-secondary-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`${UI_CONFIG.TYPOGRAPHY.headings.h4} text-text-primary mb-0`}>My Activity</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-secondary-light to-secondary-medium border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300">
                <div className="text-lg font-bold text-secondary-darker mb-1">12</div>
                <div className="text-xs text-secondary-dark">Blog Posts</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-secondary-light to-secondary-medium border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300">
                <div className="text-lg font-bold text-secondary-darker mb-1">156</div>
                <div className="text-xs text-secondary-dark">Meals Logged</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-secondary-light to-secondary-medium border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300">
                <div className="text-lg font-bold text-secondary-darker mb-1">8</div>
                <div className="text-xs text-secondary-dark">Recipes</div>
              </div>
            </div>
          </div>
          
          {/* Profile Picture Edit Controls */}
          {isEditingDp && (
            <div className="mt-6 pt-6 border-t border-border-light space-y-4 p-4 bg-background-secondary rounded-lg" role="dialog" aria-labelledby="edit-dp-title">
              <h3 id="edit-dp-title" className={`${UI_CONFIG.TYPOGRAPHY.headings.h4} text-center`}>
                Update Profile Picture
              </h3>
              
              <fieldset className="space-y-3">
                <legend className="sr-only">Choose new profile picture</legend>
                <div className="space-y-2">
                  <label htmlFor="profile-picture-upload" className="block text-sm font-semibold text-text-primary">
                    Choose new profile picture
                  </label>
                  <input 
                    id="profile-picture-upload"
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/jpeg,image/png,image/webp,image/gif" 
                    className={`${COMMON_CLASSES.INPUT_BASE} text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-secondary-light file:text-secondary-dark hover:file:bg-secondary-medium`}
                    disabled={isUploading}
                    aria-describedby="file-requirements"
                  />
                  <p id="file-requirements" className="text-xs text-text-tertiary">
                    Max 5MB, JPEG/PNG/WebP/GIF
                  </p>
                </div>
              </fieldset>
              
              <div className="flex gap-2 justify-center" role="group" aria-label="Profile picture actions">
                <button 
                  onClick={handleSaveDp} 
                  disabled={!selectedDpFile || isUploading}
                  className="bg-success hover:bg-success-dark disabled:bg-text-tertiary text-white text-xs px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
                  type="button"
                >
                  {isUploading ? 'Saving...' : 'Save'}
                </button>
                
                <button 
                  onClick={handleCancelDpEdit}
                  disabled={isUploading}
                  className="bg-text-secondary hover:bg-text-primary text-white text-xs px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-text-secondary focus:ring-offset-2"
                  type="button"
                >
                  Cancel
                </button>
                
                {dpUrl && (
                  <button 
                    onClick={handleDeleteDp} 
                    disabled={isUploading}
                    className="bg-error hover:bg-error-dark text-white text-xs px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
                    type="button"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </article>

        {/* Account Actions Card */}
        <article className={`${COMMON_CLASSES.CARD_BASE} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-error-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-error-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className={`${UI_CONFIG.TYPOGRAPHY.headings.h3} mb-0`}>Account Settings</h2>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/logout')}
              className="w-full flex items-center gap-3 p-4 text-left text-text-primary hover:bg-secondary-light border-2 border-secondary-light hover:border-secondary rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transform hover:scale-105"
              type="button"
            >
              <div className="w-10 h-10 bg-secondary-medium rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-secondary-darker" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-secondary-darker">Sign Out</span>
                <p className="text-xs text-secondary-dark">End your current session</p>
              </div>
            </button>
            
            <button 
              onClick={handleDeleteAccount}
              className="w-full flex items-center gap-3 p-4 text-left text-error-dark hover:bg-error-light border-2 border-error-light hover:border-error rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 transform hover:scale-105"
              type="button"
            >
              <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faTrashAlt} className="text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-error-dark">Delete Account</span>
                <p className="text-xs text-error">Permanently remove your account</p>
              </div>
            </button>
          </div>
        </article>
      </div>

      {/* Bio and Activity Section */}
      <div className="grid lg:grid-cols-1 gap-6">
      </div>
    </div>
  );
};

export default ProfileCard;