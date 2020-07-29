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

import User from "./user";

@Table
export default class Post extends Model<Post> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userID!: number;
  @BelongsTo(() => User) user!: User;

  @Length({ min: 3, max: 128 })
  @Column
  title!: string;

  @Length({ min: 3, max: 128 })
  @Column
  description!: string;

  @AllowNull(false)
  @Column
  text!: string;

  @Column
  image!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
