export interface UsersService {
  findByUsername(username: string): Promise<any>;
}
