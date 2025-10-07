import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IpWhitelist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  ipAddress: string; 
}
