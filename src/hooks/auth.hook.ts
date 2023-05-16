import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  username: string;
  enabled: boolean;
  email: string;
  numeroIdentite: string;
  authorities: { authority: string }[];
}

export const useAuth = () => {
  const [data, setData] = useState<AuthUser[]>();
  const [error, setError] = useState<any>();
  const token = localStorage.token;

  console.info("the token is : ", token);

  useEffect(() => {
    axios
      .get("/admin/fetch_d_clients")
      .then((res: AxiosResponse) => setData(res.data))
      .catch((err) => setError(err));
  }, [token]);

  return { data, error };
};
