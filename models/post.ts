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
import user from "./user";
import comment from "./comment";

@Table({
  tableName: env.DB_PREFIX + "post",
})
export default class post extends Model<post> {
  @HasMany(() => comment)
  comments!: comment[];

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
  @Column({
    type: DataType.TEXT({ length: "long" }),
  })
  text!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
