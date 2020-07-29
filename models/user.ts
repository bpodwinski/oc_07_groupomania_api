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

import Post from "./post";

@Table
export default class User extends Model<User> {
  @HasMany(() => Post)
  posts!: Post[];

  @AllowNull(false)
  @Length({ min: 3, max: 64 })
  @Column
  firstname!: string;

  @AllowNull(false)
  @Length({ min: 3, max: 64 })
  @Column
  lastname!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Length({ max: 128 })
  @Column({
    type: DataType.STRING(128),
  })
  email!: string;

  @AllowNull(false)
  @Length({ min: 6, max: 128 })
  @Column
  password!: string;

  @Column
  avatar!: string;

  @AllowNull(false)
  @Length({ max: 64 })
  @Column
  service!: string;

  @Default(false)
  @Column
  admin!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
