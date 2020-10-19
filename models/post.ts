import {
  AllowNull,
  Default,
  Unique,
  Length,
  IsEmail,
  IsUrl,
  ForeignKey,
  BelongsTo,
  HasMany,
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";

import user from "./user";

@Table
export default class post extends Model<post> {
  @ForeignKey(() => user)
  @AllowNull(false)
  @Column
  userID!: number;
  @BelongsTo(() => user) user!: user;

  @AllowNull(false)
  @Length({ min: 3, max: 128 })
  @Column
  title!: string;

  @AllowNull(false)
  @Length({ min: 3, max: 128 })
  @Column
  description!: string;

  @AllowNull(false)
  @Column
  text!: string;

  //@Column
  //image!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
