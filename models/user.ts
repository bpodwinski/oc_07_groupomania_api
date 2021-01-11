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

import { env } from "../utils/env";
import post from "./post";
import comment from "./comment";

@Table({
  tableName: env.DB_PREFIX + "user",
})
export default class user extends Model<user> {
  @HasMany(() => post)
  posts!: post[];

  @HasMany(() => comment)
  comments!: comment[];

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
  @Column
  gravatar!: string;

  @AllowNull(false)
  @Length({ min: 6, max: 128 })
  @Column
  password!: string;

  @AllowNull(false)
  @Length({ max: 64 })
  @Column
  service!: string;

  @AllowNull(false)
  @Column
  role!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
