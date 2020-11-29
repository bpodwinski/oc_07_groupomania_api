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
import post from "./post";

@Table({
  tableName: env.DB_PREFIX + "comment",
})
export default class comment extends Model<comment> {
  @ForeignKey(() => post)
  @AllowNull(false)
  @Column
  postID!: number;
  @BelongsTo(() => post) post!: post;

  @ForeignKey(() => user)
  @AllowNull(false)
  @Column
  userID!: number;
  @BelongsTo(() => user) user!: user;

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
