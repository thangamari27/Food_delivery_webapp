import { useState, useEffect, useCallback, useRef } from 'react';
import { testimonialService } from '@/services/testimonialService';

export const useTestimonials = (options = {}) => {
    const { autoFetch = true, filters = {} } = options;
    
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    
    const hasFetchedRef = useRef(false);
    const isFetchingRef = useRef(false);

    const fetchTestimonials = useCallback(async (params = {}) => {
        if (isFetchingRef.current) return;
        
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        try {
            const response = await testimonialService.getAll({ 
                ...filters, 
                ...params 
            });
            
            if (response.data?.success) {
                if (response.data.data?.data && Array.isArray(response.data.data.data)) {
                    setTestimonials(response.data.data.data || []);
                    setPagination(response.data.data.pagination || null);
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    setTestimonials(response.data.data || []);
                    setPagination(response.data.pagination || null);
                } else if (Array.isArray(response.data)) {
                    setTestimonials(response.data || []);
                } else {
                    // No valid data found
                    console.warn('Unexpected response structure:', response.data);
                    setTestimonials([]);
                }
            } else {
                setError(response.data?.message || 'Failed to fetch testimonials');
                setTestimonials([]);
            }
        } catch (err) {
            console.error('API Error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch testimonials');
            setTestimonials([]);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
            hasFetchedRef.current = true;
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        if (autoFetch && !hasFetchedRef.current) {
            fetchTestimonials();
        }
        
        return () => {
            hasFetchedRef.current = false;
            isFetchingRef.current = false;
        };
    }, [autoFetch, fetchTestimonials]);

    // Helper function to handle API responses consistently
    const handleApiResponse = (response, operationName) => {
        if (response.data?.success) {
            // Extract data based on structure
            const data = response.data.data?.data || response.data.data || response.data;
            return { success: true, data };
        } else {
            return { 
                success: false, 
                error: response.data?.message || `Failed to ${operationName}` 
            };
        }
    };

    const createTestimonial = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await testimonialService.create(data);
            const result = handleApiResponse(response, 'create testimonial');
            
            if (result.success) {
                await fetchTestimonials();
            } else {
                setError(result.error);
            }
            return result;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const updateTestimonial = async (tid, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await testimonialService.update(tid, data);
            const result = handleApiResponse(response, 'update testimonial');
            
            if (result.success) {
                await fetchTestimonials();
            } else {
                setError(result.error);
            }
            return result;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const deleteTestimonial = async (tid) => {
        setLoading(true);
        setError(null);

        try {
            const response = await testimonialService.deactivate(tid);
            const result = handleApiResponse(response, 'delete testimonial');
            
            if (result.success) {
                await fetchTestimonials();
            } else {
                setError(result.error);
            }
            return result;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const permanentDelete = async (tid) => {
        setLoading(true);
        setError(null);

        try {
            const response = await testimonialService.permanentDelete(tid);
            const result = handleApiResponse(response, 'permanently delete testimonial');
            
            if (result.success) {
                await fetchTestimonials();
            } else {
                setError(result.error);
            }
            return result;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const refresh = useCallback(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    return {
        testimonials,
        loading,
        error,
        pagination,
        fetchTestimonials,
        createTestimonial,
        updateTestimonial,
        deleteTestimonial,
        permanentDelete,
        refresh
    };
};

/**
 * Hook for single testimonial
 */
export const useTestimonial = (tid) => {
    const [testimonial, setTestimonial] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTestimonial = useCallback(async () => {
        if (!tid) return;

        setLoading(true);
        setError(null);

        try {
            const response = await testimonialService.getById(tid);
            
            if (response.data?.success) {
                // Handle nested structure for single testimonial too
                const data = response.data.data?.data || response.data.data || response.data;
                setTestimonial(data);
            } else {
                setError(response.data?.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch testimonial');
        } finally {
            setLoading(false);
        }
    }, [tid]);

    useEffect(() => {
        fetchTestimonial();
    }, [fetchTestimonial]);

    return {
        testimonial,
        loading,
        error,
        refresh: fetchTestimonial
    };
};