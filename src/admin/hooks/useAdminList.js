import { useEffect, useState } from 'react';
import { adminApi, ADMIN_RESOURCES, parseListResponse } from '../api/resources';

export default function useAdminList(resource, page) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const endpoint = `${ADMIN_RESOURCES[resource].endpoint}?page=${page}`;
    adminApi.list(resource, page, controller.signal)
      .then((response) => {
        setData(parseListResponse(response, endpoint));
        setError(null);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError);
          setData(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [resource, page, revision]);

  const refresh = () => {
    setLoading(true);
    setRevision((value) => value + 1);
  };
  return { data, loading, error, refresh };
}
